import { useEffect, useState } from "react";
import type { Animal } from "./types/animal";
import { listAnimals } from "./api/animals";

export default function App() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false); // are we loading at the start?
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listAnimals()
      .then(setAnimals)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []); // [] = run once, when the page opens

  if (loading) return <p>Loading animals…</p>;
  if (error) return <p role="alert">⚠️ {error}</p>;

  return (
    <main>
      <h1>🐾 Animal Help Center</h1>
      {animals.length === 0 ? (
        <p>No animals yet.</p>
      ) : (
        <ul>
          {animals.map((a) => (
            <li key={a.id}>
              <strong>{a.name ?? "Unnamed"}</strong> ({a.species}):{" "}
              {a.description}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
