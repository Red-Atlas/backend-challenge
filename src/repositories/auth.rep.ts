import AppDataSource from "../database/connect";
import { Auth } from "../entities/Auth.entity";

const AuthRepository = AppDataSource.getRepository(Auth);

export default AuthRepository;
