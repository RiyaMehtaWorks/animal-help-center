import { describe, test, expect } from "vitest";
import request from "supertest";
import { app } from "../app.js";

const validDog = {
  species: "Dog",
  description: "Brown dog near MG Road",
  caregiverIds: [],
};

describe("Animal routes", () => {
  test("POST /animals with a valid body → 201", async () => {
    const res = await request(app).post("/animals").send(validDog);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.species).toBe("dog");
  });

  test("POST /animals with {} → 400 with field details", async () => {
    const res = await request(app).post("/animals").send({});

    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe("Validation failed");
    const fields = res.body.error.details.map(
      (d: { field: string }) => d.field,
    );
    expect(fields).toContain("species");
  });

  test("POST /animals with an extra field → 400", async () => {
    const res = await request(app)
      .post("/animals")
      .send({ ...validDog, isAdmin: true });

    expect(res.status).toBe(400);
  });

  test("POST /animals with malformed JSON → 400", async () => {
    const res = await request(app)
      .post("/animals")
      .set("Content-Type", "application/json")
      .send("{bad json");
    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe("Invalid JSON in request body");
  });
  test("GET /animals/:id with an unknown id → 404", async () => {
    const res = await request(app).get("/animals/does-not-exist");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: { message: `Animal not found` },
    });
  });

  test("POST then GET by id returns the same animal", async () => {
    const created = await request(app).post("/animals").send(validDog);

    const res = await request(app).get(`/animals/${created.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(created.body);
  });
});
