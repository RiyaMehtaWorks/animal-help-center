# =============================================================================
# Dockerfile for the frontend (React + Vite → static files served by nginx)
#
# Build:  docker build -t animal-frontend ./frontend
#         (optional) --build-arg VITE_API_URL=https://api.example.com
# Run:    docker run --rm -p 5173:8080 animal-frontend
#         then open http://localhost:5173
#
# Reminder: comments must be on their own line.
# =============================================================================


# ---------- Stage 1: build the static files ----------

# Node 24 on slim Debian, only needed to RUN the build (not in the final image).
FROM node:24-slim AS build

# Work inside /app (creates it and cd's into it).
WORKDIR /app

# Layer caching: copy only the dependency files first, so `npm ci`
# is reused from cache unless dependencies change.
COPY package.json package-lock.json ./

# Clean install of ALL dependencies (Vite, TypeScript…) exactly from the lock file.
RUN npm ci

# Build argument: the backend URL the BROWSER will call.
# It gets baked into the JavaScript during `vite build`, so it must be set
# at BUILD time (docker build --build-arg ...), not at run time.
# Default = the backend running on the same machine, port 4000.
ARG VITE_API_URL=http://localhost:4000

# Make the build argument visible to Vite as an environment variable.
# Vite picks up any VITE_* variable from the environment.
ENV VITE_API_URL=$VITE_API_URL

# Copy the rest of the source code (changes often, so it comes after npm ci).
COPY . .

# Type-check and build: produces /app/dist (index.html + assets/*.js, *.css).
RUN npm run build


# ---------- Stage 2: serve the static files ----------

# nginx = a small, very fast web server, ideal for static files.
# The "unprivileged" variant runs as a NON-ROOT user (more secure) and
# therefore listens on port 8080 (ports below 1024 need root).
FROM nginxinc/nginx-unprivileged:alpine

# Copy ONLY the built files from stage 1 into the folder nginx serves.
# No Node, no node_modules, no source code in the final image.
COPY --from=build /app/dist /usr/share/nginx/html

# Documentation only: nginx listens on 8080 inside the container.
EXPOSE 8080

# No CMD needed: the nginx base image already starts nginx correctly
# (in the foreground, as PID 1, handling SIGTERM/SIGQUIT).