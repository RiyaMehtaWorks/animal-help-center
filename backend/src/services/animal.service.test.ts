import { describe, test, expect, beforeEach } from "vitest";
import { InMemoryAnimalRepository } from "../repositories/in-memory-animal.repository.js";
import { AnimalService } from "./animal.service.js";
import { NotFoundError } from "../errors/app-error.js";
import type { NewAnimal } from "../types/animal.types.js";

const sampleCat: NewAnimal = {
  species: " caT ",
  description: "Gray cat near Shah Jahan Road",
  caregiverIds: [],
};

const sampleDog: NewAnimal = {
  species: "dog",
  description: "Brown dog near MG Road",
  caregiverIds: [],
};

describe("AnimalService", () => {
  let repo: InMemoryAnimalRepository;
  let service: AnimalService;

  beforeEach(() => {
    // Arrange (shared): a fresh repo + service before every test
    repo = new InMemoryAnimalRepository();
    service = new AnimalService(repo);
  });

  test("registerAnimal trims and lowercases species", async () => {
    // Act
    const animal = await service.registerAnimal(sampleCat);

    // Assert: what the service returned…
    expect(animal.species).toBe("cat");
    // …and what was actually saved
    const stored = await repo.findById(animal.id);
    expect(stored?.species).toBe("cat");
  });

  test("getAnimal returns the animal when it exists", async () => {
    // Arrange
    const registered = await service.registerAnimal(sampleDog);

    // Act
    const found = await service.getAnimal(registered.id);

    // Assert
    expect(found).toEqual(registered);
  });

  test("getAnimal throws NotFoundError when the id doesn't exist", async () => {
    // Act + Assert: the call must FAIL with NotFoundError
    await expect(service.getAnimal("does-not-exist")).rejects.toThrow(
      NotFoundError,
    );
  });

  test("listAnimals returns every registered animal", async () => {
    // Arrange
    await service.registerAnimal(sampleCat);
    await service.registerAnimal(sampleDog);

    // Act
    const animals = await service.listAnimals();

    // Assert
    expect(animals).toHaveLength(2);
  });
});
