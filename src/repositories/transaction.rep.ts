import { SelectQueryBuilder } from "typeorm";

import AppDataSource from "../database/connect";
import { Transaction } from "../entities/Transaction.entity";

const TransactionRepository = AppDataSource.getRepository(Transaction).extend({
  async getMovementsByPeriod() {
    const queryBuilder = this.createQueryBuilder(
      "transaction"
    ) as SelectQueryBuilder<Transaction>;

    return await queryBuilder
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
