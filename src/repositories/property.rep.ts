import { SelectQueryBuilder } from "typeorm";
import AppDataSource from "../database/connect";
import { Property } from "../entities/Property.entity";

import setPagination from "../utils/setPagination.util";

const setOperator = (query) => {
  const obj = {};

  const keys = Object.keys(query);

  for (const key of keys) {
    let operator = "=";

    if (typeof query[key] == "object") operator = Object.keys(query[key])[0];

    obj[key] = {
      sql: `property.${key} ${operator} :${key}`,
      value: { [key]: query[key][operator] || query[key] },
    };
  }

  return obj as any;
};

const addFieldsFromQuery = (
  queryBuilder: SelectQueryBuilder<Property>,
  userQuery
) => {
  const { address, sector } = userQuery;
  const { area } = setOperator(userQuery);

  if (area) queryBuilder.andWhere(area.sql, area.value);

  if (address)
    queryBuilder.andWhere("property.address ILIKE :address", {
      address: `%${address}%`,
    });

  if (sector)
    queryBuilder.andWhere("property.sector = :sector", {
      sector,
    });

  return queryBuilder;
};

const PropertyRepository = AppDataSource.getRepository(Property).extend({
  async getValuation(query) {
    const queryBuilder = this.createQueryBuilder(
      "property"
    ) as SelectQueryBuilder<Property>;

    const parsedParams = addFieldsFromQuery(queryBuilder, query);

    const queryParsed = setPagination(parsedParams, query);

    queryParsed
      .innerJoin("property.advertisements", "advertisement")
      .select("property.address", "propertyAddress")
      .addSelect("property.area * advertisement.price", "valuation")
      .getRawMany();
  },

  async find(query) {
    const queryBuilder = this.createQueryBuilder(
      "property"
    ) as SelectQueryBuilder<Property>;

    const parsedParams = addFieldsFromQuery(queryBuilder, query);
    const queryParsed = setPagination(parsedParams, query);

    return await queryParsed.getManyAndCount();
  },
});

export default PropertyRepository;
