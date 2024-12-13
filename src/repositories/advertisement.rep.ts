import { SelectQueryBuilder } from "typeorm";

import AppDataSource from "../database/connect";
import { Advertisement } from "../entities/Advertisement.entity";

import { setPagination, setOperator } from "../utils/query.util";

const addFieldsFromQuery = (
  queryBuilder: SelectQueryBuilder<Advertisement>,
  userQuery
) => {
  const { id, status, sector } = userQuery;
  const { price } = setOperator("advertisement", userQuery);

  if (id)
    queryBuilder.andWhere("advertisement.id = :id", {
      id,
    });

  if (price) queryBuilder.andWhere(price.sql, price.value);

  if (status)
    queryBuilder.andWhere("advertisement.status = :status", {
      status,
    });

  if (sector)
    queryBuilder.andWhere("advertisement.sector = :sector", {
      sector,
    });

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

    return queryParsed
      .leftJoinAndSelect("advertisement.property", "property")
      .select("advertisement.price * property.area", "valuation")
      .addSelect("property.* , advertisement.*")
      .getRawMany();
  },
});

export default AdvertisementRepository;
