import { IUser } from "../user/user.dto.js";

export interface JWTPayload {
  id: IUser['id'];
  email: IUser['email'];
}
