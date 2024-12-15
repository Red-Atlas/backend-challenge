import { Property } from "../property/property.entity";
import { Transaction } from "../transaction/transaction.entity";
import { IBaseEntityType } from "../user/user.dto";

export enum AdvertisementStatusEnum {
  FOR_SALE = 'for_sale',
  FOR_LEASE = 'for_lease',
};

export type TAdvertisementStatusEnum = keyof typeof AdvertisementStatusEnum;

export enum AdvertisementPropertyTypeEnum {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  RETAIL = 'retail',
  LAND = 'land',
  INDUSTRIAL = 'industrial',
}

export type TAdvertisementPropertyTypeEnum = keyof typeof AdvertisementPropertyTypeEnum;

export interface IAdvertisement extends IBaseEntityType {
  price: number;
  status: TAdvertisementStatusEnum;
  propertyType: TAdvertisementPropertyTypeEnum;
  title: string;
  description: string;
  publishedDate: Date;
  property: Property;
  expirationDate?: Date;
  transactions?: Transaction[]
  contactInfo?: string;
  negotiable?: boolean;
  viewsCount?: number;
};

export type TCreateAdvertisement =
  Pick<IAdvertisement, 'price' | 'status' | 'propertyType' | 'title' | 'description' | 'publishedDate' | 'property'>