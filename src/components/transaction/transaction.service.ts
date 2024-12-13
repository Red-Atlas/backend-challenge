import { DeepPartial } from "typeorm";
import { ITransaction, TCreateTransaction } from "./transaction.dto";
import { Transaction } from "./transaction.entity";

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
  return Transaction.create(data as DeepPartial<Transaction>);
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

export const transactionService = Object.freeze({
  findOne,
  find,
  update,
  create,
  deleteTransaction,
  inactiveTransaction,
})