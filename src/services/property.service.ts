import Property from "../repositories/property.rep";

import PropertyDTO from "../dto/property.dto";
import validateInput from "../utils/classValidator.util";

class PropertyService {
  static async create(data) {
    try {
      const propertiesValidated = data.properties.map(async (property) => {
        const result = await validateInput(property, PropertyDTO);

        return {
          ...result,
          coordinates: {
            type: "Point",
            coordinates: result.coordinates,
          },
        };
      });

      await Property.save(await Promise.all(propertiesValidated));
    } catch (error) {
      throw error;
    }
  }

  static async getBySector() {
    try {
      return await Property.getPropertiesBySector();
    } catch (error) {
      throw error;
    }
  }

  static async locations(query) {
    try {
      const { latitude, longitude, radius } = query;

      if (radius) {
        return await Property.findLocationsNearby(latitude, longitude, radius);
      } else {
        return Property.findPropertiesByDistance(latitude, longitude);
      }
    } catch (error) {
      throw error;
    }
  }

  static async getAveragePriceBySector() {
    try {
      return await Property.getAveragePriceBySector();
    } catch (error) {
      throw error;
    }
  }

  static async findAll(query) {
    try {
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
      const result = await validateInput(data, PropertyDTO);

      const propertyParsed = {
        ...result,
        coordinates: {
          type: "Point",
          coordinates: result.coordinates,
        },
      };

      return await Property.update({ id }, propertyParsed);
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      await Property.delete({ id });
    } catch (error) {
      if (error.code == "23503") {
        const error = new Error(
          "No se puede eliminar la propiedad ya que tiene anuncios relacionados"
        );
        error["statusCode"] = 400;

        throw error;
      }

      throw error;
    }
  }
}

export default PropertyService;
