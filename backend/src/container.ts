import { InMemoryAnimalRepository } from "./repositories/in-memory-animal.repository.js";
import { AnimalService } from "./services/animal.service.js";
import { AnimalController } from "./controllers/animal.controller.js";

// Build bottom-up: each one is handed to the next
const animalRepository = new InMemoryAnimalRepository();
const animalService = new AnimalService(animalRepository);
const animalController = new AnimalController(animalService);

export const container = {
  animalController,
};
