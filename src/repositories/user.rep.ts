import AppDataSource from "../database/connect";
import { User } from "../entities/User.entity";

const UserRepository = AppDataSource.getRepository(User);

export default UserRepository;
