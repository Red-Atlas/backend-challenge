import { User } from "../user/user.entity.js";
import { IBaseEntityType } from "../user/user.dto.js";
import { Advertisement } from "../advertisement/advertisement.entity.js";
import { Transaction } from "../transaction/transaction.entity.js";
import { TPagination } from "./utils/filtersPagination.js";

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
  area: number;
  yearBuilt: number;
  transactions?: Transaction[];
  advertisement?: Advertisement[]
  amenities?: string;
  images?: string[];
};

export type TCreateProperty =
  Pick<IProperty, 'address' | 'owner' | 'sector' | 'description' | 'area' | 'yearBuilt'>

export type TPaginationProperty =
  Pick<IProperty, 'address' | 'owner' | 'sector' | 'active'> & TPagination & {
    sector: string;
    minArea: number;
    maxArea: number;
    minYearBuilt: number;
    maxYearBuilt: number;
  };


