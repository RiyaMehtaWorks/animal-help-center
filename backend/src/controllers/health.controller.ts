import type { Request, Response } from "express";
import type { HealthService } from "../services/health.service.js";

export class HealthController {
  constructor(private readonly service: HealthService) {}

  getHealth = (req: Request, res: Response) => {
    res.json(this.service.getHealth());
  };
}
