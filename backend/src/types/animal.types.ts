export type Animal = {
  id: string;
  name?: string; // optional: street animals may have no name
  species: string; // dog, cat, rabbit…
  description: string; // "brown dog, ~2 yrs, near MG Road"
  caregiverIds: string[];
  createdAt: Date;
};

// What the caller sends when creating. The repository sets id + createdAt.
export type NewAnimal = Omit<Animal, "id" | "createdAt">;
