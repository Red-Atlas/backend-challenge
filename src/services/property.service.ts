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
      return await Property.findAndCount({});
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

  static async getValuation(query) {
    try {
      return await Property.createQueryBuilder("property")
        .innerJoin("property.advertisements", "advertisement")
        .select("property.address", "propertyAddress")
        .addSelect("property.area * advertisement.price", "valuation")
        .getRawMany();
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
