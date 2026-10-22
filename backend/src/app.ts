import express from "express";
import cors from "cors";
import { container } from "./container.js";
import { createAnimalRouter } from "./routes/animal.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { config } from "./config/config.js";
import { createHealthRouter } from "./routes/health.routes.js";

export const app = express();

app.use(express.json());
app.use(cors({ origin: config.corsOrigin }));

app.use("/health", createHealthRouter(container.healthController));
app.use("/animals", createAnimalRouter(container.animalController));

app.use(errorHandler);
