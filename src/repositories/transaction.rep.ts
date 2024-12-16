import { SelectQueryBuilder } from "typeorm";

import AppDataSource from "../database/connect";
import { Transaction } from "../entities/Transaction.entity";

import { setPagination, setOperator } from "../utils/query.util";

const addFieldsFromQuery = (
  queryBuilder: SelectQueryBuilder<Transaction>,
  userQuery
) => {
  const { type } = userQuery;
  const queryParsed = setOperator("transaction", userQuery);

  if (queryParsed.price) {
    const { sql, value } = queryParsed.price;

    queryBuilder.andWhere(sql, value);
  }

  if (queryParsed.date) {
    const { sql, value } = queryParsed.date;

    queryBuilder.andWhere(sql, value);
  }

  if (type)
    queryBuilder.andWhere("transaction.type = :type", {
      type,
    });

  if (queryParsed["property.area"]) {
    const { sql, value } = queryParsed["property.area"];

    queryBuilder.andWhere(sql, value);
  }

  return queryBuilder;
};

const TransactionRepository = AppDataSource.getRepository(Transaction).extend({
  async find(query) {
    const queryBuilder = this.createQueryBuilder(
      "transaction"
    ) as SelectQueryBuilder<Transaction>;

    const parsedParams = addFieldsFromQuery(queryBuilder, query);

    const queryParsed = setPagination(parsedParams, query);

    return await queryParsed
      .leftJoin("transaction.property", "property")
      .addSelect([
        "property.id",
        "property.address",
        "property.area",
        "property.ownerName",
        "property.sector",
      ])
      .getManyAndCount();
  },

  async getMovementsByPeriod() {
    const queryBuilder = this.createQueryBuilder(
      "transaction"
    ) as SelectQueryBuilder<Transaction>;

    const queryPaginated = setPagination(queryBuilder, {});

    return await queryPaginated
      .select("EXTRACT(YEAR FROM transaction.date)", "year")
      .addSelect("EXTRACT(MONTH FROM transaction.date)", "month")
      .addSelect("transaction.type", "type")
      .addSelect("COUNT(transaction.id)", "totalTransactions")
      .groupBy("EXTRACT(YEAR FROM transaction.date)")
      .addGroupBy("EXTRACT(MONTH FROM transaction.date)")
      .addGroupBy("transaction.type")
      .orderBy({
        year: "ASC",
        month: "ASC",
      })
      .getRawMany();
  },
});

export default TransactionRepository;
