import type { Animal } from "../types/animal";

const API_URL = import.meta.env.VITE_API_URL;

export async function listAnimals(): Promise<Animal[]> {
  const res = await fetch(`${API_URL}/animals`);

  if (!res.ok) {
    throw new Error(`Failed to load animals (${res.status})`);
  }

  return res.json();
}
