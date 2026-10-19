import type { Animal, NewAnimal } from "../types/animal.types.js";
import type { AnimalRepository } from "../interfaces/animal-repository.interface.js";

export class AnimalService {
  constructor(private readonly animals: AnimalRepository) {}

  async registerAnimal(input: NewAnimal): Promise<Animal> {
    // Business rule: "Dog", " dog " and "DOG" must all be saved as "dog"
    const cleaned: NewAnimal = {
      ...input,
      species: input.species.trim().toLowerCase(),
    };
    return this.animals.create(cleaned);
  }
  async getAnimal(id: string): Promise<Animal | null> {
    return this.animals.findById(id);
  }
  async listAnimals(): Promise<Animal[]> {
    return this.animals.list();
  }
}
