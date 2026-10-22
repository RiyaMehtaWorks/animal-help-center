export type Animal = {
  id: string;
  name?: string;
  species: string;
  description: string;
  caregiverIds: string[];
  createdAt: string; // 🤔 see below
};

export type NewAnimal = Omit<Animal, "id" | "createdAt">; // same idea as the backend
