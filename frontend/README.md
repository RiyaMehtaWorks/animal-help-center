# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## Running with Docker

The `Dockerfile` has two stages:

1. **build** (Node 24): `npm ci` → `npm run build` → static files in `dist/`
2. **serve** (nginx, non-root): copies only `dist/` and serves it on port 8080

The final image contains no Node, no `node_modules` and no source code.

### Build the image

From the repo root:

```bash
docker build -t animal-frontend ./frontend
```

### ⚠️ The API URL is baked in at build time

Vite replaces `import.meta.env.VITE_API_URL` with its value **during the
build**. To point the frontend at a different backend, **rebuild** with a
build argument (default: `http://localhost:4000`):

```bash
docker build -t animal-frontend --build-arg VITE_API_URL=https://api.example.com ./frontend
```

`docker run -e VITE_API_URL=...` does **not** work: by then the value is
already inside the JavaScript files.

Never put secrets in `VITE_*` variables. They end up in public JavaScript.

### Run a container

```bash
docker run --rm -p 5173:8080 animal-frontend
```

Open http://localhost:5173 (the backend must be running on port 4000).

Why `5173:8080`?

- nginx listens on **8080** inside the container (the non-root image can't use port 80)
- the browser sees **localhost:5173**, which matches the backend's
  `CORS_ORIGIN`, so no backend config change is needed

Tip: build and run in one go (run only happens if the build succeeds):

```bash
docker build -t animal-frontend ./frontend && docker run --rm -p 5173:8080 animal-frontend
```

### Stopping

Ctrl + C, or `docker stop <name>`.

### Troubleshooting

| Problem                              | Cause                                            | Fix                                                                    |
| ------------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------- |
| `port is already allocated`          | `npm run dev` or another container is using 5173 | stop it (`docker ps` → `docker stop <name>`)                           |
| Page shows `⚠️ Load failed`          | backend not running, or CORS origin mismatch     | start the backend; check `CORS_ORIGIN` matches the URL in your browser |
| Frontend calls the wrong backend URL | the URL was baked in at build time               | rebuild with `--build-arg VITE_API_URL=...`                            |
