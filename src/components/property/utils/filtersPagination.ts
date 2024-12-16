import { TPaginationProperty } from "../property.dto";

export interface TPagination {
  page: number;
  perPage: number;
}

export function applyFilters(
  qb: any,
  { 
    address, sector, owner, active, minArea, maxArea, minYearBuilt, maxYearBuilt
  } : TPaginationProperty & TPagination
) {
  if (address) qb.andWhere("property.address ILIKE :address", { address: `%${address}%` });
  if (sector) qb.andWhere("property.sector = :sector", { sector });
  if (owner) qb.andWhere("owner.id = :owner", { owner });
  if (active !== undefined) qb.andWhere("property.active = :active", { active });
  if (minArea) qb.andWhere("property.area >= :minArea", { minArea })
  if (maxArea) qb.andWhere("property.area <= :maxArea", { maxArea })
  if (minYearBuilt) qb.andWhere("property.yearBuilt >= :minYearBuilt", { minYearBuilt })
  if (maxYearBuilt) qb.andWhere("property.yearBuilt <= :maxYearBuilt", { maxYearBuilt })
  return qb;
}
