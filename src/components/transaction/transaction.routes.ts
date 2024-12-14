import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactionByPeriods,
  getTransactions,
  inactiveTransaction,
  updateTransaction
} from './transaction.controller.js';

const transactionRouter = Router();

transactionRouter.post('/transactions', authenticate, createTransaction);
transactionRouter.get('/transactions', authenticate, getTransactions);
transactionRouter.get('/transactions/periods', authenticate, getTransactionByPeriods);
transactionRouter.get('/transactions/:id', authenticate, getTransaction);
transactionRouter.put('/transactions/:id', authenticate, updateTransaction);
transactionRouter.delete('/transactions/:id', authenticate, deleteTransaction);
transactionRouter.patch('/transactions/:id', authenticate, inactiveTransaction);

export default transactionRouter;
