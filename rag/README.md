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
