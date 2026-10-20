import { IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator";
import type { NewAnimal } from "../types/animal.types.js";

export class CreateAnimalDto implements NewAnimal {
  @IsString()
  @IsNotEmpty()
  species!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsString({ each: true })
  caregiverIds!: string[];
}
