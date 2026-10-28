import { app } from "./app.js";
import { config } from "./config/config.js";

const server = app.listen(config.port, () => {
  console.log(`Backend running on http://localhost:${config.port}`);
});

function shutdown(signal: string) {
  console.log(`${signal} received: shutting down gracefully…`);

  // 1. Stop accepting new requests, let in-flight ones finish, then exit
  server.close(() => {
    console.log("All requests finished. Bye 👋");
    process.exit(0);
  });

  // 2. Safety net: if something hangs, force-exit after 10s
  setTimeout(() => process.exit(1), 10_000).unref();
}

// “when this signal arrives, run my function” (now PID 1 does handle it )
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("SIGINT", () => shutdown("SIGINT"));
