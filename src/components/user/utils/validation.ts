import { IUser } from "../user.dto";

export function validationInputCreateUser({
  firstName, lastName, email, password
}: {
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
  email: IUser['email'];
  password: IUser['password'];
}) {
  if (!firstName) {
    throw new Error('FirstName is required')
  } else if (!lastName) {
    throw new Error('LastName is required')
  } else if (!email) {
    throw new Error('Email is required')
  } else if (!password) {
    throw new Error('Password is required')
  }
  return true;
}