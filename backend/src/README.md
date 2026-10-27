# Backend

Node + TypeScript + Express API for AnimalHelpCenter.

## Getting started

```bash
cd backend
npm install
cp .env.example .env   # then edit values if needed
npm run dev
```

## Scripts

| Command              | What it does                                                   |
| -------------------- | -------------------------------------------------------------- |
| `npm run dev`        | start in watch mode, loading `.env`                            |
| `npm test`           | run all tests once                                             |
| `npm run test:watch` | re-run tests on every save                                     |
| `npm run build`      | compile TypeScript to `dist/`                                  |
| `npm start`          | run the compiled app (env vars come from the host, not `.env`) |

## Environment variables

All config is read and validated in `src/config/config.ts`. The app refuses
to start if a value is invalid.

| Variable   | Allowed values                          | Default       | Purpose                           |
| ---------- | --------------------------------------- | ------------- | --------------------------------- |
| `NODE_ENV` | `development` \| `test` \| `production` | `development` | which environment the app runs in |
| `PORT`     | integer 1–65535                         | `4000`        | port the API listens on           |

When adding a new variable: add it to `EnvVariables` in `config.ts`,
to `.env.example`, and to this table.

## Running with Docker

The backend has a multi-stage `Dockerfile`:

1. **build** stage: installs all dependencies and compiles TypeScript → `dist/`
2. **runtime** stage: installs production dependencies only, copies `dist/`,
   runs as the non-root `node` user

### Build the image

From the repo root:

```bash
docker build -t animal-backend ./backend
```

### Run a container

```bash
docker run --rm -p 4000:4000 animal-backend
```

- `-p 4000:4000` maps **host port : container port**
- `--rm` removes the container when it stops
- Check it: `curl http://localhost:4000/health`

### Passing configuration

The image contains **no `.env` file**. Settings come from environment variables
(validated by `src/config/config.ts`; defaults apply when unset; the image sets
`NODE_ENV=production`).

```bash
# one variable at a time
docker run --rm -p 4000:4000 -e CORS_ORIGIN=http://localhost:5173 animal-backend

# or from a file
docker run --rm -p 4000:4000 --env-file backend/.env animal-backend
```

⚠️ With `--env-file backend/.env`, the values in that file win, including
`NODE_ENV=development`.

If a value is invalid (e.g. `-e PORT=abc`), the container exits at startup
with a list of problems.

⚠️ If you change `PORT`, change the right side of `-p` too:
`-e PORT=5000 -p 4000:5000`

### Stopping

- **Ctrl + C** in the terminal running it, or `docker stop <name>`
- The server handles `SIGTERM`/`SIGINT`: it stops accepting new requests,
  finishes in-flight ones, then exits (force-exits after 10s)

### Useful commands

| Command              | What it does                |
| -------------------- | --------------------------- |
| `docker ps`          | list running containers     |
| `docker stop <name>` | stop a container            |
| `docker logs <name>` | show a container's output   |
| `docker images`      | list images on your machine |

### Troubleshooting

| Error                                                     | Cause                                                 | Fix                                                       |
| --------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| `Bind for 0.0.0.0:4000 failed: port is already allocated` | another container or `npm run dev` is using port 4000 | `docker ps` → `docker stop <name>`, or stop `npm run dev` |
| `❌ Invalid environment configuration`                    | an env var failed validation                          | fix the value shown in the message                        |
| Container keeps running after Ctrl+C                      | an old image without graceful shutdown                | rebuild: `docker build -t animal-backend ./backend`       |
