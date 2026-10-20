import express from "express";
import { container } from "./container.js";
import { createAnimalRouter } from "./routes/animal.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";

export const app = express();

app.use(express.json());
app.use("/animals", createAnimalRouter(container.animalController));
app.use(errorHandler);
