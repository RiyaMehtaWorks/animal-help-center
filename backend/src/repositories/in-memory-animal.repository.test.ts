import { describe, test, expect, beforeEach } from "vitest";
import { InMemoryAnimalRepository } from "./in-memory-animal.repository.js";
import type { NewAnimal } from "../types/animal.types.js";

// Reusable sample input
const sampleDog: NewAnimal = {
  species: "dog",
  description: "brown dog near MG Road",
  caregiverIds: [],
};

describe("InMemoryAnimalRepository", () => {
  let repo: InMemoryAnimalRepository;

  beforeEach(() => {
    repo = new InMemoryAnimalRepository(); // a FRESH repo before every test
  });

  test("create adds an id and createdAt", async () => {
    const animal = await repo.create(sampleDog);

    expect(animal.id).toBeDefined(); // id exists
    expect(animal.createdAt).toBeInstanceOf(Date); // createdAt is a Date
    expect(animal.species).toBe("dog"); // input fields are kept
  });

  test("findById returns the animal when it exists", async () => {
    const created = await repo.create(sampleDog);

    const found = await repo.findById(created.id);

    expect(found).toEqual(created);
  });

  test("findById returns null when the id doesn't exist", async () => {
    const found = await repo.findById("does-not-exist");

    expect(found).toBeNull();
  });

  test("list returns a copy, so changing it doesn't change stored data", async () => {
    await repo.create(sampleDog);

    const list = await repo.list();
    list.push(list[0]!); // trying to tamper with the result

    const listAgain = await repo.list();
    expect(listAgain).toHaveLength(1); // still only 1 stored
  });
});
