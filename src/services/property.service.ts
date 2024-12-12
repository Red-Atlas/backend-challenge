import Property from "../repositories/property.rep";

class PropertyService {
  static async create(data) {
    try {
      const propertyEntity = Property.create(data);
      await Property.save(propertyEntity);
    } catch (error) {
      throw error;
    }
  }

  static async findAll(query) {
    try {
      if (query.valuation) return await Property.getValuation(query);

      return await Property.find(query);
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      return await Property.findOne({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await Property.update({ id }, data);
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      await Property.delete({ id });
    } catch (error) {
      throw error;
    }
  }
}

export default PropertyService;
