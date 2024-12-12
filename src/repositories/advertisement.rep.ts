import AppDataSource from "../database/connect";
import { Advertisement } from "../entities/Advertisement.entity";

const AdvertisementRepository = AppDataSource.getRepository(
  Advertisement
).extend({
  async getPropsByPrice() {},
  async getPropsByType() {},
  async getPropsByStatus() {},
});

export default AdvertisementRepository;
