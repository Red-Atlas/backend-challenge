import Transaction from "../repositories/transaction.rep";

class TransactionService {
  static async create(data) {
    try {
      const advertisementEntity = Transaction.create(data);
      await Transaction.save(advertisementEntity);
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
