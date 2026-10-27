# =============================================================================
# Dockerfile for the RAG service (Python + FastAPI)
#
# Build:  docker build -t animal-rag ./rag
# Run:    docker run --rm -p 8000:8000 animal-rag
#
# Reminder: comments must be on their own line. A "#" after an
# instruction on the same line is NOT treated as a comment.
# =============================================================================

# Base image: official Debian Linux + Python 3.13.
# "slim" = small variant (fewer OS tools), so downloads are faster and there
# are fewer security issues. 3.13 matches rag/.python-version.
FROM python:3.13-slim

# Get the `uv` program by copying ONE file out of uv's official image
# (hosted on GitHub's container registry, ghcr.io). No pip install needed.
# 0.12 matches the uv version used locally.
COPY --from=ghcr.io/astral-sh/uv:0.12 /uv /bin/uv

# Create /app and make it the current folder for every following instruction
# (like `mkdir /app && cd /app`).
WORKDIR /app

# Settings for uv:
#   UV_COMPILE_BYTECODE=1  pre-compile .py files during install, so the app starts faster
#   UV_PYTHON_DOWNLOADS=0  never download a separate Python; use the image's 3.13
#   UV_HTTP_TIMEOUT=300    wait up to 5 minutes per download (default is 30s),
#                          so slow or unstable internet doesn't fail the build
ENV UV_COMPILE_BYTECODE=1 \
    UV_PYTHON_DOWNLOADS=0 \
    UV_HTTP_TIMEOUT=300

# ---------- Layer caching trick ----------
# Copy ONLY the dependency files first. Docker caches each step, so the slow
# install below is reused as long as these two files don't change.
COPY pyproject.toml uv.lock ./

# Install dependencies (not our own code yet) into /app/.venv.
#   --locked               fail if uv.lock is out of date (like `npm ci`)
#   --no-dev               skip dev-only packages such as pytest
#   --no-install-project   deps only, so editing code doesn't re-run this slow step
RUN uv sync --locked --no-dev --no-install-project

# pyproject.toml says readme = "README.md", so building our package needs it.
COPY README.md ./

# Now copy our actual source code (changes often, so it comes AFTER the deps).
COPY src ./src

# Install our own project (the `rag` package) into .venv, so `rag.main`
# can be imported. Fast, because the dependencies are already installed.
RUN uv sync --locked --no-dev

# Put the venv's programs (fastapi, uvicorn) first on the PATH,
# so they can be run by name without `uv run`.
ENV PATH="/app/.venv/bin:$PATH"

# Security: don't run as root. The Python image has no normal user
# (unlike the Node image's `node` user), so create one.
RUN useradd --create-home appuser

# Everything from here on, including the running app, runs as appuser.
# If the app were ever hacked, the attacker would not be root.
USER appuser

# Documentation only: the app listens on port 8000.
# It doesn't open anything; `docker run -p 8000:8000` does.
EXPOSE 8000

# The command the container runs when it starts.
#   fastapi run   production mode (no auto-reload), listens on 0.0.0.0 so
#                 Docker's port mapping can reach it
#   [ "...", ... ] "exec form": FastAPI becomes process #1 (PID 1) with no
#                  shell in between, so it receives SIGTERM from `docker stop`
#                  and shuts down cleanly
CMD ["fastapi", "run", "src/rag/main.py", "--port", "8000"]