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
import { adminAuthenticate } from '../../middlewares/adminAuthenticate.js';

const transactionRouter = Router();

// Statistics/Graphs Routes
transactionRouter.get('/analytics/periods', adminAuthenticate, getTransactionByPeriods);

//CRUDS
transactionRouter.post('/', authenticate, createTransaction);
transactionRouter.get('/', authenticate, getTransactions);
transactionRouter.get('/:id', authenticate, getTransaction);
transactionRouter.put('/:id', authenticate, updateTransaction);
transactionRouter.delete('/:id', authenticate, deleteTransaction);
transactionRouter.patch('/:id', adminAuthenticate, inactiveTransaction);

export default transactionRouter;
