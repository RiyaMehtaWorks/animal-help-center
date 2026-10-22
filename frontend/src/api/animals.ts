import type { Animal, NewAnimal } from "../types/animal";

const API_URL = import.meta.env.VITE_API_URL;

export async function listAnimals(): Promise<Animal[]> {
  const res = await fetch(`${API_URL}/animals`);

  if (!res.ok) {
    throw new Error(`Failed to load animals (${res.status})`);
  }

  return res.json();
}

export async function createAnimal(input: NewAnimal): Promise<Animal> {
  const res = await fetch(`${API_URL}/animals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const body = await res.json();

  if (!res.ok) {
    // backend's error shape: { error: { message, details } }
    throw new Error(
      body.error?.message ?? `Failed to create animal (${res.status})`,
    );
  }

  return body;
}
