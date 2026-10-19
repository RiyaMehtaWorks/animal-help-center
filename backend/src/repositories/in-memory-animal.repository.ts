import { randomUUID } from "node:crypto";
import type { Animal, NewAnimal } from "../types/animal.types.js";
import type { AnimalRepository } from "../interfaces/animal-repository.interface.js";

export class InMemoryAnimalRepository implements AnimalRepository {
  private animals: Animal[] = [];

  async create(input: NewAnimal): Promise<Animal> {
    const animal: Animal = {
      ...input,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.animals.push(animal);
    return animal;
  }

  async findById(id: string): Promise<Animal | null> {
    return this.animals.find((animal) => animal.id === id) ?? null;
  }

  async list(): Promise<Animal[]> {
    return [...this.animals];
  }
}
