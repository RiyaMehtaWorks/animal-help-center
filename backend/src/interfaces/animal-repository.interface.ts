import type { Animal, NewAnimal } from "../types/animal.types.js";

export interface AnimalRepository {
  create(input: NewAnimal): Promise<Animal>;
  findById(id: string): Promise<Animal | null>;
  list(): Promise<Animal[]>;
}
