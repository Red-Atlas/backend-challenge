import Transaction from "../repositories/transaction.rep";

import TransactionDTO from "../dto/transaction.dto";

import validateInput from "../utils/classValidator.util";

class TransactionService {
  static async create(data, userId) {
    try {
      const transactionsValidated = data.transactions.map(
        async (transaction) => {
          const transactionWithUserId = {
            ...transaction,
            user: { id: userId },
          };

          return await validateInput(transactionWithUserId, TransactionDTO);
        }
      );

      await Transaction.save(await Promise.all(transactionsValidated));
    } catch (error) {
      throw error;
    }
  }

  static async findAll(query) {
    try {
      return await Transaction.find(query);
    } catch (error) {
      throw error;
    }
  }

  static async getMovementsByPeriod() {
    try {
      return await Transaction.getMovementsByPeriod();
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      return await Transaction.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
          property: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id, userId, data) {
    try {
      const result = await validateInput(
        {
          ...data,
          user: {
            id: userId,
          },
        },
        TransactionDTO
      );

      return await Transaction.update({ id }, result);
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id, userId) {
    try {
      await Transaction.delete({ id });
    } catch (error) {
      throw error;
    }
  }
}

export default TransactionService;
