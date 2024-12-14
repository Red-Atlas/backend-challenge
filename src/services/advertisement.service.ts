import Advertisement from "../repositories/advertisement.rep";

import AdvertisementDTO from "../dto/advertisement.dto";
import validateInput from "../utils/classValidator.util";

class AdvertisementService {
  static async create(data) {
    try {
      const advertisementsValidated = data.advertisements.map(
        async (advertisement) =>
          await validateInput(advertisement, AdvertisementDTO)
      );

      await Advertisement.save(await Promise.all(advertisementsValidated));
    } catch (error) {
      throw error;
    }
  }

  static async findAll(query) {
    try {
      return await Advertisement.find(query);
    } catch (error) {
      throw error;
    }
  }

  static async getPropertiesByType() {
    try {
      return await Advertisement.getPropertiesByType();
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      return await Advertisement.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await Advertisement.update({ id }, data);
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      await Advertisement.delete({ id });
    } catch (error) {
      throw error;
    }
  }
}

export default AdvertisementService;
