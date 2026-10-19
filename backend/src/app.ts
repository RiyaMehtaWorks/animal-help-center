import express from "express";
import { healthRouter } from "./routes/health.routes.js";
import { container } from "./container.js";
import { createAnimalRouter } from "./routes/animal.routes.js";

export const app = express();

app.use(express.json());
app.use("/health", healthRouter);
app.use("/animals", createAnimalRouter(container.animalController));
