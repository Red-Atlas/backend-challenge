import { SelectQueryBuilder } from "typeorm";

function setQueryParams(queryBuilder: SelectQueryBuilder<any>, query) {
  let { limit, offset } = query;

  if (!limit || limit > 50) limit = 50;
  if (!offset || offset < 1) offset = 0;

  return queryBuilder.take(limit).skip(offset);
}

export default setQueryParams;
