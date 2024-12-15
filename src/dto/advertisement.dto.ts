import { PropertyType, Status } from "../schemas/advertisement.enum";

import {
  IsNumber,
  IsPositive,
  IsEnum,
  IsObject,
  IsInt,
  IsDefined,
} from "class-validator";

import { Property } from "../entities/Property.entity";

class AdvertisementDTO {
  @IsNumber({}, { message: "El precio debe ser numerico" })
  @IsPositive({ message: "El precio debe ser mayor a 0" })
  price: number;

  @IsEnum(Status, { message: "estados admitidos: for_sale, for_lease" })
  status: string;

  @IsEnum(PropertyType, {
    message: "tipos admitidos: apartment, house, retail, land, industrial",
  })
  propertyType: string;

  @IsObject()
  @IsDefined()
  property: {
    id: number;
  };
}

export default AdvertisementDTO;
