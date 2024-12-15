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

export interface IGeoLocation {
  type: 'Point' | 'MultiPoint' | 'LineString' | 'MultiLineString' | 'Polygon' | 'MultiPolygon';
  coordinates: [number, number];
}

export interface IProperty extends IBaseEntityType {
  address: string;
  owner: User;
  sector: TPropertySectorEnum;
  description: string;
  area: number;
  yearBuilt: number;
  location?: IGeoLocation
  transactions?: Transaction[];
  advertisement?: Advertisement[]
  amenities?: string;
  images?: string[];
};

export type TCreateProperty =
  Omit<IProperty, 'transactions' | 'advertisement' | 'amenities' | 'images'>

export type TPaginationProperty =
  Pick<IProperty, 'address' | 'owner' | 'sector' | 'active'> & TPagination & {
    sector: string;
    minArea: number;
    maxArea: number;
    minYearBuilt: number;
    maxYearBuilt: number;
  };

export interface TPropertyGeoLocation {
  latitude: number;
  longitude: number;
  radiusKm: number;
}
