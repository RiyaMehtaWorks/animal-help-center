import { Router } from "express";
import type { AnimalController } from "../controllers/animal.controller.js";
import { CreateAnimalDto } from "../dtos/create-animal.dto.js";
import { validateBody } from "../middlewares/validate-body.js";

export function createAnimalRouter(controller: AnimalController): Router {
  const router = Router();
  router.post("/", validateBody(CreateAnimalDto), controller.create);
  router.get("/", controller.list);
  router.get("/:id", controller.getById);
  return router;
}
