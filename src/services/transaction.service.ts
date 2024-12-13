import Transaction from "../repositories/transaction.rep";

class TransactionService {
  static async create(data) {
    try {
      await Transaction.save(data.transactions);
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
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await Transaction.update({ id }, data);
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      await Transaction.delete({ id });
    } catch (error) {
      throw error;
    }
  }
}

export default TransactionService;
