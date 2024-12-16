import { NextFunction, Request, Response } from "express";

import Transaction from "../services/transaction.service";
import BaseController from "./base.controller";

class TransactionController extends BaseController {
  constructor() {
    super(Transaction);
  }

  async getMovementsByPeriod(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Transaction.getMovementsByPeriod();

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();
