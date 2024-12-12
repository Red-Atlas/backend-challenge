import Advertisement from "../repositories/advertisement.rep";

class AdvertisementService {
  static async create(data) {
    try {
      const advertisementEntity = Advertisement.create(data);
      await Advertisement.save(advertisementEntity);
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

  static async findById(id) {
    try {
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

export default AdvertisementService;
