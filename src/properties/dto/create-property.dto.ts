import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Sector } from '../enums/sector.enum';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNumber()
  @IsPositive({ message: 'Area must be a positive number' })
  area: number;

  @IsEnum(Sector, {
    message: `Sector must be one of the following: ${Object.values(Sector).join(', ')}`,
  })
  sector: Sector;

  @IsString()
  @IsNotEmpty({ message: 'Owner name is required' })
  owner_name: string;
}
