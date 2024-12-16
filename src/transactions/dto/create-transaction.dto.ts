import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class CreateTransactionDto {
  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @IsEnum(TransactionType, {
    message: `Type must be one of the following: ${Object.values(TransactionType).join(', ')}`,
  })
  type: TransactionType;

  @IsNumber()
  property_id: number;

  @IsNumber()
  listing_id: number;

  @IsNumber()
  @IsOptional()
  user_id?: number;

  @IsOptional()
  date?: Date;
}
