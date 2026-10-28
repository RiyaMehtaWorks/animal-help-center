# RAG service

Python (FastAPI) service that will answer animal-care questions from trusted
sources. Only the Node backend calls it.

## Getting started

```bash
cd rag
uv sync                                  # installs Python 3.13 + dependencies into .venv
uv run fastapi dev src/rag/main.py       # http://localhost:8000
```

- Health check: `GET /health`
- API docs (auto-generated): http://localhost:8000/docs

## Tests

```bash
uv run pytest
```

## Running with Docker

The `Dockerfile` installs dependencies with uv (production only, no pytest)
and runs the app with `fastapi run` as a non-root user.

### Build the image

From the repo root:

```bash
docker build -t animal-rag ./rag
```

The first build can be slow: it downloads every Python package. Later
builds reuse the cached dependency layer unless `pyproject.toml` or
`uv.lock` change.

### Run a container

```bash
docker run --rm -p 8000:8000 animal-rag
```

- Health check: `curl http://localhost:8000/health`
- API docs: http://localhost:8000/docs

Tip: chain build and run so the run only happens if the build succeeds:

```bash
docker build -t animal-rag ./rag && docker run --rm -p 8000:8000 animal-rag
```

### Stopping

Ctrl + C, or `docker stop <name>`. Uvicorn handles `SIGTERM`, so the
container shuts down cleanly.

### Troubleshooting

| Error                                    | Cause                                                                   | Fix                                                       |
| ---------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------- |
| `Failed to download ... network timeout` | slow or unstable internet                                               | retry; `UV_HTTP_TIMEOUT` in the Dockerfile is set to 300s |
| `pull access denied for animal-rag`      | the build failed, so there's no local image and Docker tried Docker Hub | fix the build error first; use `&&`                       |
| `port is already allocated`              | another container is using 8000                                         | `docker ps` → `docker stop <name>`                        |
