import { DeepPartial } from "typeorm";
import { IProperty, TCreateProperty, TPaginationProperty, TPropertyGeoLocation } from "./property.dto";
import { Property } from "./property.entity";
import { TSortingType } from "../utils/sorting";
import { AppDataSource } from "../../db";
import { applyFilters, TPagination } from "./utils/filtersPagination";
import { getPaginationParams } from "../utils/pagination";

async function findOne({
  filter,
}: { filter: Partial<Omit<IProperty, 'images' | 'advertisement' | 'transactions'>> }): Promise<Property> {
  const property = await Property.findOneBy({ ...filter, active: true });
  if (!property) {
    throw new Error('property not found')
  }

  return property
}

async function find(
  filter?: Partial<Omit<IProperty, 'images' | 'advertisement' | 'transactions'>>
): Promise<Array<Property>> {
  return Property.find({where: filter})
}

async function update({
  id, data
}: { 
  id: IProperty['id'], data: Partial<Property>
}): Promise<{ success: boolean, message: string }> {
  await findOne({ filter: { id } });

  await Property.update({ id }, data)

  return {
    success: true,
    message: 'Property updated successfully'
  }
}

async function create(
  data: TCreateProperty
): Promise<Property> {
  return Property.create(data as DeepPartial<Property>).save();
}

async function deleteProperty(id: IProperty['id']): Promise<string> {
  const property = await findOne({ filter: { id }});
  await property.remove()
  return 'Property Deleted successfully'
};

async function inactiveProperty(id: IProperty['id']): Promise<Property> {
  const property = await findOne({ filter: { id } });

  property.active = false

  return property.save()
}
// property pagination with sort
async function getPropertiesPagination(
  data: TPaginationProperty & TSortingType
) {
  const { limit, page, skip } = getPaginationParams(data.page, data.perPage);
  const propertyRepository = AppDataSource.getRepository(Property);
  const orderBy = data.sortBy ? data.sortBy : 'createdAt';
  const sortOrder = data.sortOrder === 'ASC' ? 'ASC' : 'DESC';

  const [properties, total] = await propertyRepository
    .createQueryBuilder("property")
    .leftJoinAndSelect("property.owner", "owner")
    .leftJoinAndSelect("property.advertisement", "advertisement")
    .leftJoinAndSelect("property.transactions", 'transaction')
    .where((qb) => {
      applyFilters(qb, data);
    })
    .orderBy(`property.${orderBy}`, sortOrder)
    .skip(skip)
    .take(limit)
    .getManyAndCount();
  
  return({
    data: properties,
    pagination: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      perPage: limit,
    },
  });
}
// Graphic distribution by sector
async function getDistributionBySector() {
  const propertyRepository = AppDataSource.getRepository(Property);

  return propertyRepository
    .createQueryBuilder('property')
    .select('property.sector', 'sector')
    .addSelect('COUNT(property.id)', 'propertyCount')
    .groupBy('property.sector')
    .getRawMany();
}
//Graphics properties by type
async function getPropertiesByType() {
  const propertyRepository = AppDataSource.getRepository(Property);

  return propertyRepository
    .createQueryBuilder('property')
    .innerJoin('property.advertisement', 'advertisement')
    .select('advertisement.propertyType', 'propertyType')
    .addSelect('COUNT(property.id)', 'propertyCount')
    .where('property.active = :active', { active: true })
    .groupBy('advertisement.propertyType')
    .getRawMany();
}
// Graphic average prices by sector
async function getAveragePricesBySector() {
  const propertyRepository = AppDataSource.getRepository(Property);

  return propertyRepository
    .createQueryBuilder('property')
    .innerJoin('property.advertisement', 'advertisement')
    .select('property.sector', 'sector')
    .addSelect('ROUND(AVG(advertisement.price), 2)', 'price')
    .where('property.active = :active', { active: true })
    .groupBy('property.sector')
    .orderBy('price', 'DESC')
    .getRawMany()
}
// Properties with valuation
async function getPropertiesWithValuation(data: TPagination) {
  const propertyRepository = AppDataSource.getRepository(Property);
  const { limit, page } = getPaginationParams(data.page, data.perPage);

  const [properties, total] = await Promise.all([
    propertyRepository
      .createQueryBuilder('property')
      .select('property.*')
      .addSelect('Round(avg_prices.avg_price * property.area, 2)', 'valuation')
      .innerJoin(
        qb => {
          return qb
            .subQuery()
            .select('property.sector', 'sector')
            .addSelect('AVG(advertisement.price)', 'avg_price')
            .from(Property, 'property')
            .innerJoin('property.advertisement', 'advertisement')
            .where('property.active = :active', { active: true })
            .groupBy('property.sector');
        },
        'avg_prices',
        'property.sector = avg_prices.sector'
      )
      .where('property.active = :active', { active: true })
      .orderBy('property.createdAt', 'DESC')
      .offset(page)
      .limit(data.perPage)
      .getRawMany(),

      propertyRepository
        .createQueryBuilder('property')
        .where('property.active = :active', { active: true })
        .getCount(),
    ])

  return({
    properties,
    pagination: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      perPage: limit,
    },
  });
}
// Geo-location find properties within radius
async function findPropertiesWithinRadius(data: TPropertyGeoLocation & TPagination) {
  const propertyRepository = AppDataSource.getRepository(Property);
  const { longitude, latitude, radiusKm } = data

  const { limit, page, skip } = getPaginationParams(data.page, data.perPage);

  const radiusMeters = radiusKm * 1000;

  const [ properties , total ] = await propertyRepository
    .createQueryBuilder('property')
    .where(
      `ST_DWithin(
        property.location::geography,
        ST_SetSRID(ST_Point(:longitude, :latitude), 4326)::geography,
        :radius
      )`,
      { longitude, latitude, radius: radiusMeters }
    )
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  return {
    data: properties,
    pagination: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      perPage: limit,
    },
  }
}
// Geo-location find properties ordered by proximity
async function findPropertiesOrderedByProximity(
  data: Omit<TPropertyGeoLocation, 'radiusKm'> & TPagination
) {
  const propertyRepository = AppDataSource.getRepository(Property);

   const { longitude, latitude } = data

  const { limit, page, skip } = getPaginationParams(data.page, data.perPage);

  const [ properties, total ] = await propertyRepository
    .createQueryBuilder('property')
    .addSelect(
      `ST_Distance(
        property.location,
        ST_SetSRID(ST_Point(:longitude, :latitude), 4326)
      )`,
      'distance'
    )
    .orderBy('distance', 'ASC')
    .setParameters({ longitude, latitude })
    .skip(skip)
    .take(limit)
    .getManyAndCount();
  
  return {
    data: properties,
    pagination: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      perPage: limit,
    },
  }
}

export const propertyService = Object.freeze({
  findOne,
  find,
  update,
  create,
  deleteProperty,
  inactiveProperty,
  getPropertiesPagination,
  getPropertiesWithValuation,
  getDistributionBySector,
  getPropertiesByType,
  getAveragePricesBySector,
  findPropertiesWithinRadius,
  findPropertiesOrderedByProximity,
})