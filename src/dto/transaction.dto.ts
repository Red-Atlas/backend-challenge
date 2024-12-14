import { Type } from "../schemas/transaction.enum";

import {
  IsNumber,
  IsPositive,
  IsEnum,
  IsDate,
  IsString,
} from "class-validator";

class TransactionDTO {
  @IsString({ message: "La dirección debe ser de tipo string" })
  address: string;

  @IsNumber({}, { message: "El precio debe ser numerico" })
  @IsPositive({ message: "El precio debe ser mayor a 0" })
  price: string;

  @IsDate({ message: "La fecha debe ser de tipo fecha" })
  date: Date;

  @IsEnum(Type, {
    message:
      "tipos admitidos: sale_purchase, lease, mortgage, judicialSale, other",
  })
  type: string;
}

export default TransactionDTO;
