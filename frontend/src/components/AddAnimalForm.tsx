import { useState, type FormEvent } from "react";
import type { Animal } from "../types/animal";
import { createAnimal } from "../api/animals";

type Props = {
  onCreated: (animal: Animal) => void;
};

export function AddAnimalForm({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const animal = await createAnimal({
        name: name.trim() || undefined,
        species,
        description,
        caregiverIds: [],
      });
      onCreated(animal);
      setName("");
      setSpecies("");
      setDescription("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an animal</h2>
      <label>
        Name (optional)
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Species
        <input value={species} onChange={(e) => setSpecies(e.target.value)} />
      </label>
      <label>
        Description
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      {error && <p role="alert">⚠️ {error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Saving…" : "Add animal"}
      </button>
    </form>
  );
}
