import { transactionService } from '../transaction.service';
import { AppDataSource } from '../../../db';
import { Transaction } from '../transaction.entity';

jest.mock('../../../db', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('getTransactionByPeriods', () => {
  it('should return transactions grouped by year, month, and type', async () => {
    const mockTransactionData = [
      { year: '2023', month: '12', transactionType: 'SALE_PURCHASE', totalTransactions: '10' },
      { year: '2023', month: '11', transactionType: 'LEASE', totalTransactions: '5' },
      { year: '2022', month: '12', transactionType: 'JUDICIAL_SALE', totalTransactions: '8' },
    ];

    const mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      addGroupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      addOrderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(mockTransactionData),
    };

    const mockRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

    const result = await transactionService.getTransactionByPeriods();

    expect(AppDataSource.getRepository).toHaveBeenCalledWith(Transaction);
    expect(mockQueryBuilder.select).toHaveBeenCalledWith([
      'EXTRACT(YEAR FROM transaction.createdAt) AS year',
      'EXTRACT(MONTH FROM transaction.createdAt) AS month',
      'transaction.type AS transactionType',
      'COUNT(transaction.id) AS totalTransactions',
    ]);
    expect(mockQueryBuilder.where).toHaveBeenCalledWith('transaction.createdAt IS NOT NULL');
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      'transaction.active = :active',
      { active: true }
    );
    expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith(
      'EXTRACT(YEAR FROM transaction.createdAt)'
    );
    expect(mockQueryBuilder.addGroupBy).toHaveBeenCalledWith(
      'EXTRACT(MONTH FROM transaction.createdAt)'
    );
    expect(mockQueryBuilder.addGroupBy).toHaveBeenCalledWith('transaction.type');
    expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('year', 'DESC');
    expect(mockQueryBuilder.addOrderBy).toHaveBeenCalledWith('month', 'DESC');
    expect(mockQueryBuilder.addOrderBy).toHaveBeenCalledWith('transactionType', 'ASC');
    expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();

    expect(result).toEqual(mockTransactionData);
  });
})