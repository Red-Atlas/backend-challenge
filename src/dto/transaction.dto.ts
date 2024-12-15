import { Type } from "../schemas/transaction.enum";

import {
  IsNumber,
  IsPositive,
  IsEnum,
  Matches,
  IsString,
} from "class-validator";

class TransactionDTO {
  @IsString({ message: "La dirección debe ser de tipo string" })
  address: string;

  @IsNumber({}, { message: "El precio debe ser numerico" })
  @IsPositive({ message: "El precio debe ser mayor a 0" })
  price: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe estar en el formato aaaa-mm-dd",
  })
  date: string;

  @IsEnum(Type, {
    message:
      "tipos admitidos: sale_purchase, lease, mortgage, judicialSale, other",
  })
  type: string;
}

export default TransactionDTO;
