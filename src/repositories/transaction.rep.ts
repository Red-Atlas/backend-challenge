import AppDataSource from "../database/connect";
import { Transaction } from "../entities/Transaction.entity";

const TransactionRepository = AppDataSource.getRepository(Transaction);

export default TransactionRepository;
