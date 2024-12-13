import { IUser } from "../user/user.dto";

export interface JWTPayload {
  id: IUser['id'];
  email: IUser['email'];
}
