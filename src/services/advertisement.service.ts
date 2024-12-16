import Advertisement from "../repositories/advertisement.rep";

import AdvertisementDTO from "../dto/advertisement.dto";
import validateInput from "../utils/classValidator.util";

class AdvertisementService {
  static async create(data, userId) {
    try {
      const advertisementsValidated = data.advertisements.map(
        async (advertisement) => {
          const advertisementWithUserId = {
            ...advertisement,
            user: { id: userId },
          };

          return await validateInput(advertisementWithUserId, AdvertisementDTO);
        }
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
        relations: {
          user: true,
          property: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id, userId, data) {
    try {
      const result = await validateInput(
        {
          ...data,
          user: {
            id: userId,
          },
        },
        AdvertisementDTO
      );

      const advertisement = await this.findById(id);

      if (advertisement?.user.id != userId) {
        const error = new Error(
          "No tiene permisos para modificar este anuncio"
        );
        error["statusCode"] = 403;

        throw error;
      }

      return await Advertisement.update({ id }, result);
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id, userId) {
    try {
      const advertisement = await this.findById(id);

      if (advertisement?.user.id != userId) {
        const error = new Error(
          "No tiene permisos para modificar este anuncio"
        );
        error["statusCode"] = 403;

        throw error;
      }

      await Advertisement.delete({ id });
    } catch (error) {
      throw error;
    }
  }
}

export default AdvertisementService;
