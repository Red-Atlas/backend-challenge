import AppDataSource from "../database/connect";
import { Advertisement } from "../entities/Advertisement.entity";

const AdvertisementRepository = AppDataSource.getRepository(Advertisement);

export default AdvertisementRepository;
