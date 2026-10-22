import { InMemoryAnimalRepository } from "./repositories/in-memory-animal.repository.js";
import { AnimalService } from "./services/animal.service.js";
import { AnimalController } from "./controllers/animal.controller.js";
import { HealthService } from "./services/health.service.js";
import { HealthController } from "./controllers/health.controller.js";

// Health
const healthService = new HealthService();
const healthController = new HealthController(healthService);

// Build bottom-up: each one is handed to the next
const animalRepository = new InMemoryAnimalRepository();
const animalService = new AnimalService(animalRepository);
const animalController = new AnimalController(animalService);

export const container = {
  healthController,
  animalController,
};
