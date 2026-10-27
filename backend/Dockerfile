# ---------- Stage 1: build ----------
# start from an official image with Node 24 on a small Debian Linux
FROM node:24-slim AS build 
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
# ci > a clean install exactly from the lock file (the CI-safe version of npm install)
# ci > If you copied src before npm ci, every tiny code edit would re-install all packages. (slow)

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---------- Stage 2: runtime ----------
FROM node:24-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
# --omit=dev > skip devDependencies (TypeScript, Vitest, tsx…)

COPY --from=build /app/dist ./dist
# COPY --from=build >	take files from stage 1

USER node
# don’t run as root. If the app is ever hacked, the attacker has fewer powers

EXPOSE 4000
# documentation: “this app listens on 4000”

CMD ["node", "dist/server.js"]
# the command that runs when a container starts