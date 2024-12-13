import { Property } from "../property/property.entity.js";
import { ITransaction } from "../transaction/transaction.dto.js";

export interface IBaseEntityType {
  id: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export type TUserRole = keyof typeof UserRole;

export interface IUser extends IBaseEntityType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: TUserRole;
  property?: Property[];
  phone?: string;
  transactions?: ITransaction[]
}

export type IUserCreate = Pick<IUser, 'firstName' | 'lastName' | 'password' | 'email'>;