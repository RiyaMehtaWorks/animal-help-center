import { describe, test, expect } from "vitest";
import request from "supertest";
import { app } from "../app.js";

describe("Health route", () => {
  test("GET /health → 200 with status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.uptimeSeconds).toBe("number");
    expect(typeof res.body.timestamp).toBe("string");
  });
});
