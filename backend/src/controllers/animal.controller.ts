import type { Request, Response } from "express";
import type { AnimalService } from "../services/animal.service.js";

export class AnimalController {
  constructor(private readonly service: AnimalService) {}

  create = async (req: Request, res: Response) => {
    const animal = await this.service.registerAnimal(req.body);
    res.status(201).json(animal);
  };

  list = async (req: Request, res: Response) => {
    const animals = await this.service.listAnimals();
    res.json(animals);
  };

  getById = async (req: Request<{ id: string }>, res: Response) => {
    const animal = await this.service.getAnimal(req.params.id);
    if (!animal) {
      return res.status(404).json({ msg: "Animal Not Found" });
    }
    res.status(200).json(animal);
  };
}
