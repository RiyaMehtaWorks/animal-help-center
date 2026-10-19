import { Router } from "express";
import type { AnimalController } from "../controllers/animal.controller.js";

export function createAnimalRouter(controller: AnimalController): Router {
  const router = Router();
  router.post("/", controller.create);
  router.get("/", controller.list);
  router.get("/:id", controller.getById);
  return router;
}
