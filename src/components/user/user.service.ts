import { DeepPartial } from "typeorm";
import { validationInputCreateUser } from "./utils/validation.js";
import { IUser } from "./user.dto.js";
import { User } from "./user.entity.js";

async function findOne({
  filter,
}: { filter: Partial<Omit<IUser, 'property'>> }): Promise<User> {
  const user = await User.findOneBy({ ...filter, active: true });
  if (!user) {
    throw new Error('User not found')
  }

  return user
}

async function find(filter?: Partial<Omit<IUser, 'property'>>): Promise<Array<User>> {
  return User.find({where: filter})
}

async function update({
  id, data
}: { id: IUser['id'], data: Partial<User> }): Promise<{ success: boolean, message: string }> {
  await findOne({ filter: { id } });

  await User.update({ id }, data)

  return {
    success: true,
    message: 'User updated successfully'
  }
}

async function create(
  data: Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>
): Promise<User> {
  validationInputCreateUser({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password
  });

  const userFound = await User.findOneBy({ email: data.email });

  if (userFound) {
    throw new Error('Email in use')
  }

  return User.create(data as DeepPartial<User>).save();
}

async function deleteUser(id: IUser['id']): Promise<string> {
  const user = await findOne({ filter: { id }});
  await user.remove()
  return 'User Deleted successfully'
};

/**
 * 
 * @param id 
 * @description - this service replace the delete for soft delete user
 * @returns 
 */
async function inactiveUser(id: IUser['id']): Promise<User> {
  const user = await findOne({ filter: { id } });

  user.active = false

  return user.save()
}

export const userService = Object.freeze({
  findOne,
  find,
  update,
  create,
  deleteUser,
  inactiveUser,
})