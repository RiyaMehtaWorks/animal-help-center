import type { RequestHandler } from "express";
import { plainToInstance, type ClassConstructor } from "class-transformer";
import { validate } from "class-validator";
import { ValidationError } from "../errors/app-error.js";

export function validateBody<T extends object>(
  dtoClass: ClassConstructor<T>,
): RequestHandler {
  return async (req, res, next) => {
    const dto = plainToInstance(dtoClass, req.body ?? {});

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new ValidationError(
        errors.map((e) => ({
          field: e.property,
          problems: Object.values(e.constraints ?? {}),
        })),
      );
    }

    req.body = dto;
    next();
  };
}
