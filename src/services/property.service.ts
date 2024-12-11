import Property from "../repositories/property.rep";

class PropertyService {
  static async create(data) {
    try {
    } catch (error) {
      throw error;
    }
  }

  static async findAll(query) {
    try {
      return await Property.find();
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

export default PropertyService;
