
export enum UserRole {
  ADMIN = 'Administrador',
  USER = 'Usuario'
}

export type TUserRole = keyof typeof UserRole;

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: TUserRole;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserCreate = Pick<IUser, 'firstName' | 'lastName' | 'password' | 'email'>;