import { advertisementService } from '../advertisement.service';
import { AppDataSource } from '../../../db';
import { Advertisement } from '../advertisement.entity';

jest.mock('../../../db', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('getAdvertisementsPriceRange', () => {
  it('should return advertisement price range distribution', async () => {
    const mockPriceRangeData = [
      { priceRange: '0-50k', priceRangeOrder: '1', totalAdvertisements: 10 },
      { priceRange: '50k-100k', priceRangeOrder: '2', totalAdvertisements: 15 },
      { priceRange: '>250k', priceRangeOrder: '6', totalAdvertisements: 5 },
    ];

    const mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      addGroupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(mockPriceRangeData),
    };

    const mockRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

    const result = await advertisementService.getAdvertisementsPriceRange();

    expect(AppDataSource.getRepository).toHaveBeenCalledWith(Advertisement);
    expect(mockQueryBuilder.select).toHaveBeenCalledWith([
      'CASE WHEN advertisement.price BETWEEN 0 AND 50000 THEN \'0-50k\' ' +
        'WHEN advertisement.price BETWEEN 50001 AND 100000 THEN \'50k-100k\' ' +
        'WHEN advertisement.price BETWEEN 100001 AND 150000 THEN \'100k-150k\' ' +
        'WHEN advertisement.price BETWEEN 150001 AND 200000 THEN \'150k-200k\' ' +
        'WHEN advertisement.price BETWEEN 200001 AND 250000 THEN \'200k-250k\' ' +
        'ELSE \'>250k\' END AS priceRange',

      'CASE WHEN advertisement.price BETWEEN 0 AND 50000 THEN 1 ' +
        'WHEN advertisement.price BETWEEN 50001 AND 100000 THEN 2 ' +
        'WHEN advertisement.price BETWEEN 100001 AND 150000 THEN 3 ' +
        'WHEN advertisement.price BETWEEN 150001 AND 200000 THEN 4 ' +
        'WHEN advertisement.price BETWEEN 200001 AND 250000 THEN 5 ' +
        'ELSE 6 END AS priceRangeOrder',

      'COUNT(advertisement.id) AS totalAdvertisements',
    ]);
    expect(mockQueryBuilder.where).toHaveBeenCalledWith(
      'advertisement.active = :active',
      { active: true }
    );
    expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith('priceRange');
    expect(mockQueryBuilder.addGroupBy).toHaveBeenCalledWith('priceRangeOrder');
    expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('priceRangeOrder');
    expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();

    expect(result).toEqual(mockPriceRangeData);
  })
})