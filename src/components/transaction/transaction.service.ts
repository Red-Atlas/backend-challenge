import { DeepPartial } from "typeorm";
import { ITransaction, TCreateTransaction } from "./transaction.dto.js";
import { Transaction } from "./transaction.entity.js";
import { AppDataSource } from "db.js";

async function findOne({
  filter,
}: { filter: Partial<ITransaction> }): Promise<Transaction> {
  const transaction = await Transaction.findOneBy({ ...filter, active: true });
  if (!transaction) {
    throw new Error('transaction not found')
  }

  return transaction
}

async function find(filter?: Partial<ITransaction>): Promise<Array<Transaction>> {
  return Transaction.find({where: filter})
}

async function update({
  id, data
}: { 
  id: ITransaction['id'], data: Partial<Transaction>
}): Promise<{ success: boolean, message: string }> {
  await findOne({ filter: { id } });

  await Transaction.update({ id }, data)

  return {
    success: true,
    message: 'Transaction updated successfully'
  }
}

async function create(
  data: TCreateTransaction
): Promise<Transaction> {
  return Transaction.create(data as DeepPartial<Transaction>).save();
}

async function deleteTransaction(id: ITransaction['id']): Promise<string> {
  const transaction = await findOne({ filter: { id }});
  await transaction.remove()
  return 'Transaction Deleted successfully'
};

async function inactiveTransaction(id: ITransaction['id']): Promise<Transaction> {
  const transaction = await findOne({ filter: { id } });

  transaction.active = false

  return transaction.save()
}

async function getTransactionByPeriods(){
  const transactionRepository = AppDataSource.getRepository(Transaction);
  
  return transactionRepository
    .createQueryBuilder('transaction')
    .select([
      'EXTRACT(YEAR FROM transaction.createdAt) AS year',
      'EXTRACT(MONTH FROM transaction.createdAt) AS month',
      'transaction.type AS transactionType',
      'COUNT(transaction.id) AS totalTransactions'
    ])
    .where('transaction.createdAt IS NOT NULL')
    .andWhere('transaction.active = :active', { active: true })
    .groupBy('EXTRACT(YEAR FROM transaction.createdAt)')
    .addGroupBy('EXTRACT(MONTH FROM transaction.createdAt)')
    .addGroupBy('transaction.type')
    .orderBy('year', 'DESC')
    .addOrderBy('month', 'DESC')
    .addOrderBy('transactionType', 'ASC')
    .getRawMany();
}

export const transactionService = Object.freeze({
  findOne,
  find,
  update,
  create,
  deleteTransaction,
  inactiveTransaction,
  getTransactionByPeriods,
})