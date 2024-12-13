import { SelectQueryBuilder } from "typeorm";
import AppDataSource from "../database/connect";
import { Property } from "../entities/Property.entity";

import { setPagination, setOperator } from "../utils/query.util";

const addFieldsFromQuery = (
  queryBuilder: SelectQueryBuilder<Property>,
  userQuery
) => {
  const { address, sector, advertisementId } = userQuery;
  const { area } = setOperator("propery", userQuery);

  if (area) queryBuilder.andWhere(area.sql, area.value);

  if (address)
    queryBuilder.andWhere("property.address ILIKE :address", {
      address: `%${address}%`,
    });

  if (sector)
    queryBuilder.andWhere("property.sector = :sector", {
      sector,
    });

  if (advertisementId)
    queryBuilder
      .leftJoinAndSelect("property.advertisements", "advertisement")
      .where("advertisement.id = :advertisementId", { advertisementId });

  return queryBuilder;
};

const PropertyRepository = AppDataSource.getRepository(Property).extend({
  async find(query) {
    const queryBuilder = this.createQueryBuilder(
      "property"
    ) as SelectQueryBuilder<Property>;

    const parsedParams = addFieldsFromQuery(queryBuilder, query);
    const queryParsed = setPagination(parsedParams, query);

    return await queryParsed.getManyAndCount();
  },

  async getPropertiesBySector() {
    const queryBuilder = this.createQueryBuilder(
      "property"
    ) as SelectQueryBuilder<Property>;

    return await queryBuilder
      .select("property.sector", "sector")
      .addSelect("COUNT(property.id)", "count")
      .groupBy("property.sector")
      .orderBy("count", "DESC")
      .getRawMany();
  },

  async getAveragePriceBySector() {
    const queryBuilder = this.createQueryBuilder(
      "property"
    ) as SelectQueryBuilder<Property>;

    return await queryBuilder
      .innerJoin("property.advertisements", "advertisement")
      .select("property.sector", "sector")
      .addSelect("AVG(advertisement.price)", "averagePrice")
      .groupBy("property.sector")
      .orderBy("averagePrice", "DESC")
      .getRawMany();
  },
});

export default PropertyRepository;
