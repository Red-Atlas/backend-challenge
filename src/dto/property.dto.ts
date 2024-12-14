import { Sector } from "../schemas/property.enum";

import {
  IsNumber,
  IsPositive,
  IsEnum,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from "class-validator";
import { Type } from "class-transformer";

class PropertyDTO {
  @IsString({ message: "La dirección debe ser de tipo string" })
  address: string;

  @IsNumber({}, { message: "El area debe ser numerico" })
  @IsPositive({ message: "El area debe ser mayor a 0" })
  area: number;

  @IsString({ message: "La dirección debe ser de tipo string" })
  ownerName: string;

  @IsEnum(Sector, {
    message:
      "tipos admitidos: residential, commercial, industrial, agricultural",
  })
  sector: string;

  @IsArray()
  @ArrayMinSize(2, { message: "Coordinates must have exactly two elements" })
  @ArrayMaxSize(2, { message: "Coordinates must have exactly two elements" })
  @Type(() => Number)
  coordinates: [number, number];
}

export default PropertyDTO;
