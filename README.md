# AnimalHelpCenter

An app where a caregiver of an animal, be it a pet or a rescue, can connect
with vets and have a consultation chat with them. For general questions
about an animal's health, especially for people in remote areas who cannot
afford a consultation, a RAG-based care assistant answers from trusted sources.

## Repository structure

| Folder      | What it is                                                          | Docs                         |
| ----------- | ------------------------------------------------------------------- | ---------------------------- |
| `frontend/` | React + TypeScript web app (Vite), served by nginx in Docker        | [README](frontend/README.md) |
| `backend/`  | Node + TypeScript API: Controller → Service → Repository, with DI   | [README](backend/README.md)  |
| `rag/`      | Python (FastAPI) service for the AI care assistant                  | [README](rag/README.md)      |
| `docs/`     | Requirements, data model, architecture, and decision records (ADRs) | —                            |

## Quick start (Docker Compose)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
docker compose up --build
```

| Service  | URL                                                                 |
| -------- | ------------------------------------------------------------------- |
| Frontend | http://localhost:5173                                               |
| Backend  | http://localhost:4000/health                                        |
| RAG      | http://localhost:8000/health · API docs: http://localhost:8000/docs |

Check status (wait until every service shows `healthy`):

```bash
docker compose ps
```

Stop everything:

```bash
docker compose down
```

### Useful commands

| Command                          | What it does                                          |
| -------------------------------- | ----------------------------------------------------- |
| `docker compose up --build`      | build images if needed, start all services, show logs |
| `docker compose up -d`           | start in the background ("detached")                  |
| `docker compose ps`              | list services and their health                        |
| `docker compose logs -f backend` | follow one service's logs                             |
| `docker compose down`            | stop and remove containers + network                  |

### How it fits together

- All services share a private Docker network and reach each other by
  **service name** (e.g. `http://rag:8000` from the backend).
- The **browser** is outside that network, so the frontend calls the
  backend at `http://localhost:4000` (set at build time via `VITE_API_URL`).
- The frontend starts only after the backend's healthcheck passes.
- Configuration is passed through `compose.yaml` (`environment:` for the
  backend, build `args:` for the frontend). No `.env` files go into images.

### Troubleshooting

| Problem                     | Fix                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| `port is already allocated` | stop whatever uses 4000 / 5173 / 8000 (`npm run dev`, old containers: `docker ps` → `docker stop <name>`) |
| A service stays `unhealthy` | `docker compose logs <service>` to see why                                                                |
| Slow first build            | normal: dependencies download once, then they're cached                                                   |

## Running without Docker (development)

Each service can also run directly with hot reload. See its README:
[frontend](frontend/README.md) · [backend](backend/README.md) · [rag](rag/README.md)

## Documentation

- [Requirements](docs/requirements/README.md)
- [Data model](docs/data-model/README.md)
- [Architecture](docs/architecture/README.md)
- [ADR-0001: Repository structure](docs/adr/0001-repository-structure.md)
- [Backend setup steps](docs/backend/README.md)

## Status

🚧 Early development. Working demo target: ~10 weeks.
