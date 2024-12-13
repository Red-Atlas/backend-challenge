import { User } from "../user/user.entity";
import { IBaseEntityType } from "../user/user.dto";
import { Advertisement } from "../advertisement/advertisement.entity";

export enum PropertySectorEnum {
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  INDUSTRIAL = 'industrial',
  AGRICULTURAL = 'agricultural',
};

export type TPropertySectorEnum = keyof typeof PropertySectorEnum;

export interface IProperty extends IBaseEntityType {
  address: string;
  owner: User;
  sector: TPropertySectorEnum;
  description: string;
  size: number;
  yearBuilt: number;
  advertisement?: Advertisement[]
  amenities?: string;
  images?: string[];
};

export type TCreateProperty =
  Pick<IProperty, 'address' | 'owner' | 'sector' | 'description' | 'size' | 'yearBuilt'>