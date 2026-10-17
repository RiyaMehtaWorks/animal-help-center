import type { Request, Response } from "express";
import { getHealth } from "../services/health.service.js";

export function getHealthStatus(req: Request, res: Response) {
  const data = getHealth();
  res.json(data);
}
