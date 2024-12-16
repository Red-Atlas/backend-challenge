import { IsEnum, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { ListingStatus } from '../enums/listing-status.enum';
import { PropertyType } from '../enums/property-type.enum';

export class CreateListingDto {
  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @IsEnum(ListingStatus, {
    message: `Status must be one of the following: ${Object.values(ListingStatus).join(', ')}`,
  })
  status: ListingStatus;

  @IsEnum(PropertyType, {
    message: `Property type must be one of the following: ${Object.values(PropertyType).join(', ')}`,
  })
  property_type: PropertyType;

  @IsNumber()
  @IsNotEmpty({ message: 'Property ID is required' })
  property_id: number;

  @IsNumber()
  @IsNotEmpty({ message: 'User ID is required' })
  user_id: number;
}
