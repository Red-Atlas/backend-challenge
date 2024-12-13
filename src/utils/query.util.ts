import { SelectQueryBuilder } from "typeorm";

function setPagination(queryBuilder: SelectQueryBuilder<any>, query) {
  let { limit, offset } = query;

  if (!limit || limit > 50) limit = 50;
  if (!offset || offset < 1) offset = 0;

  return queryBuilder.take(limit).skip(offset);
}

const setOperator = (entity: string, query) => {
  const obj = {};

  const keys = Object.keys(query);

  for (const key of keys) {
    let operator = "=";

    if (typeof query[key] == "object") operator = Object.keys(query[key])[0];

    obj[key] = {
      sql: `${entity}.${key} ${operator} :${key}`,
      value: { [key]: query[key][operator] || query[key] },
    };
  }

  return obj as any;
};

export { setOperator, setPagination };
