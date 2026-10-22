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
