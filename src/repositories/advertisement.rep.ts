import { SelectQueryBuilder } from "typeorm";

import AppDataSource from "../database/connect";
import { Advertisement } from "../entities/Advertisement.entity";

import { setPagination, setOperator } from "../utils/query.util";

const addFieldsFromQuery = (
  queryBuilder: SelectQueryBuilder<Advertisement>,
  userQuery
) => {
  const { status, type } = userQuery;
  const queryParsed = setOperator("advertisement", userQuery);

  if (queryParsed.price) {
    const { sql, value } = queryParsed.price;

    queryBuilder.andWhere(sql, value);
  }

  if (status)
    queryBuilder.andWhere("advertisement.status = :status", {
      status,
    });

  if (type)
    queryBuilder.andWhere("advertisement.propertyType = :type", {
      type,
    });

  if (queryParsed["property.area"]) {
    const { sql, value } = queryParsed["property.area"];

    queryBuilder.andWhere(sql, value);
  }

  return queryBuilder;
};

const AdvertisementRepository = AppDataSource.getRepository(
  Advertisement
).extend({
  async find(query) {
    const queryBuilder = this.createQueryBuilder(
      "advertisement"
    ) as SelectQueryBuilder<Advertisement>;

    const parsedParams = addFieldsFromQuery(queryBuilder, query);

    const queryParsed = setPagination(parsedParams, query);

    return await queryParsed
      .leftJoin("advertisement.property", "property")
      .addSelect([
        "property.id",
        "property.address",
        "property.area",
        "property.ownerName",
        "property.sector",
      ])
      .addSelect("advertisement.price * property.area", "valuation")
      .getRawMany();
  },

  async getPropertiesByType() {
    const queryBuilder = this.createQueryBuilder(
      "advertisement"
    ) as SelectQueryBuilder<Advertisement>;

    const queryParsed = setPagination(queryBuilder, {});

    return await queryParsed
      .select("advertisement.propertyType", "propertyType")
      .addSelect("COUNT(advertisement.id)", "count")
      .groupBy("advertisement.propertyType")
      .orderBy("count", "DESC")
      .getRawMany();
  },
});

export default AdvertisementRepository;
