import { Advertisement } from "../advertisement/advertisement.entity.js";
import { IBaseEntityType } from "../user/user.dto.js";
import { User } from "../user/user.entity.js";

export enum TransactionTypeEnum {
  SALE_PURCHASE = 'sale_purchase',
  LEASE = 'lease',
  MORTGAGE = 'mortgage',
  JUDICIAL_SALE = 'judicial_sale'
};

export type TTransactionType = keyof typeof TransactionTypeEnum;

export enum PaymentMethodEnum {
  CASH = 'cash',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
}

export type TPaymentMethodType = keyof typeof PaymentMethodEnum;

export enum TransactionStatusEnum {
  IN_VERIFICATION = 'in_verification',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type TTransactionStatusType = keyof typeof TransactionStatusEnum

export interface ITransaction extends IBaseEntityType {
  address: string;
  price: number;
  user: User;
  advertisement: Advertisement;
  type: TTransactionType;
  paymentMethod: TPaymentMethodType;
  status?: TTransactionStatusType
  notes?: string;
  taxAmount?: number;
};

export type TCreateTransaction =
  Pick<ITransaction, 'address' | 'price' | 'user' | 'advertisement' | 'type' | 'paymentMethod'>