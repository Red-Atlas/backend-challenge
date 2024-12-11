import User from "../repositories/user.rep";
import Auth from "../repositories/auth.rep";

import { createSaltAndHash, genSalt } from "../utils/hash.util";

class UserService {
  static async create(data: { email: string; password: string }) {
    try {
      const { password, ...userData } = data;

      const userInstance = User.create(userData);
      const user = await User.save(userInstance);

      const authSchema = Auth.create({
        password: createSaltAndHash(password, genSalt()),
        user,
      });

      await Auth.save(authSchema);

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findAll(query) {
    try {
    } catch (error) {
      throw error;
    }
  }

  static async findOne(where) {
    try {
      return await User.findOne({ where });
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id) {
    try {
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
