import { SelectQueryBuilder } from "typeorm";
import AppDataSource from "../database/connect";
import { Property } from "../entities/Property.entity";

import { setPagination, setOperator } from "../utils/query.util";

const addFieldsFromQuery = (
  queryBuilder: SelectQueryBuilder<Property>,
  userQuery
) => {
  const { address, sector, advertisement } = userQuery;
  const parsedQuery = setOperator("propery", userQuery);

  if (parsedQuery.area) {
    const { area } = parsedQuery;

    queryBuilder.andWhere(area.sql, area.value);
  }

  if (address)
    queryBuilder.andWhere("property.address ILIKE :address", {
      address: `%${address}%`,
    });

  if (sector)
    queryBuilder.andWhere("property.sector = :sector", {
      sector,
    });

  if (advertisement) {
    queryBuilder.leftJoinAndSelect("property.advertisements", "advertisement");

    if (userQuery["advertisement.id"]) {
      const { sql, value } = parsedQuery["advertisement.id"];

      queryBuilder.andWhere(sql, value);
    }

    if (userQuery["advertisement.price"]) {
      const { sql, value } = parsedQuery["advertisement.price"];

      queryBuilder.andWhere(sql, value);
    }
  }

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

    const queryParsed = setPagination(queryBuilder, {});

    return await queryParsed
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

    const queryParsed = setPagination(queryBuilder, {});

    return await queryParsed
      .innerJoin("property.advertisements", "advertisement")
      .select("property.sector", "sector")
      .addSelect("AVG(advertisement.price)", "averagePrice")
      .groupBy("property.sector")
      .getRawMany();
  },

  async findLocationsNearby(
    latitude: number,
    longitude: number,
    radius: number
  ) {
    const queryBuilder = this.createQueryBuilder(
      "property"
    ) as SelectQueryBuilder<Property>;
    const radiusInMeters = radius * 1000;

    const queryParsed = setPagination(queryBuilder, {});

    const locations = await queryParsed
      .where(
        `ST_DWithin(
          property.coordinates::geography,
          ST_SetSRID(ST_MakePoint(:latitude, :longitude), 4326)::geography,
          :radius
        )`,
        { longitude, latitude, radius: radiusInMeters }
      )
      .getMany();

    return locations;
  },

  async findPropertiesByDistance(
    latitude: number,
    longitude: number
  ): Promise<Property[]> {
    const queryBuilder = this.createQueryBuilder(
      "property"
    ) as SelectQueryBuilder<Property>;

    const queryParsed = setPagination(queryBuilder, {});

    return await queryParsed
      .addSelect(
        `ST_Distance(
          property.coordinates::geography,
          ST_SetSRID(ST_MakePoint(:latitude, :longitude), 4326)::geography
        )`,
        "distance"
      )
      .setParameters({ latitude, longitude })
      .orderBy("distance", "ASC")
      .getMany();
  },
});

export default PropertyRepository;
