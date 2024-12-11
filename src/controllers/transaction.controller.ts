import Transaction from "../services/transaction.service";
import BaseController from "./base.controller";

class TransactionController extends BaseController {
  constructor() {
    super(Transaction);
  }
}

export default new TransactionController();
