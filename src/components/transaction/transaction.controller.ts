import { Request, Response, NextFunction } from 'express';
import { transactionService } from './transaction.service';

export async function getTransaction(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params;
  try {
    const transaction = await transactionService.findOne({ filter: { ...req.body, id } });
    return res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
}

export async function getTransactions(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const transactions = await transactionService.find(req.body);
    return res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    next(error);
  }
}

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const transaction = await transactionService.create(req.body);
    return res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
}

export async function updateTransaction(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const transaction = await transactionService.update({ id, data: req.body });
    return res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
}

export async function deleteTransaction(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const transaction = await transactionService.deleteTransaction(id);
    return res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
}

export async function inactiveTransaction(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const transaction = await transactionService.inactiveTransaction(id);
    return res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
}

export async function getTransactionByPeriods(
  req: Request, res: Response, next: NextFunction
): Promise<any> {
    try {
      const transactionsByPeriods = await transactionService.getTransactionByPeriods()
      return res.status(200).json({ success: true, data: transactionsByPeriods })
    } catch (error) {
      next(error);
    }
};