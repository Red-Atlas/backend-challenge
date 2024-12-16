import { propertyService } from '../property.service';
import { AppDataSource } from '../../../db';
import { Property } from '../property.entity';
import { getPaginationParams } from '../../utils/pagination';

jest.mock('../../../db', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

jest.mock('../../utils/pagination', () => ({
  getPaginationParams: jest.fn(),
}));

describe('getDistributionBySector', () => {
  it('should return distribution of properties by sector', async () => {
    const mockDistribution = [
      { sector: 'RESIDENTIAL', propertyCount: 10 },
      { sector: 'COMMERCIAL', propertyCount: 5 },
    ];

    const mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(mockDistribution),
    };

    const mockRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

    const result = await propertyService.getDistributionBySector();

    expect(AppDataSource.getRepository).toHaveBeenCalledWith(Property);
    expect(mockQueryBuilder.select).toHaveBeenCalledWith('property.sector', 'sector');
    expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith('COUNT(property.id)', 'propertyCount');
    expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith('property.sector');
    expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();
    expect(result).toEqual(mockDistribution);
  });
})


describe('getPropertiesByType', () => {
  it('should return properties grouped by type', async () => {
    const mockPropertyTypeDistribution = [
      { propertyType: 'APARTMENT', propertyCount: 10 },
      { propertyType: 'HOUSE', propertyCount: 5 },
    ];

    const mockQueryBuilder = {
      innerJoin: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue(mockPropertyTypeDistribution),
    };

    const mockRepository = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

    const result = await propertyService.getPropertiesByType();

    expect(AppDataSource.getRepository).toHaveBeenCalledWith(Property);
    expect(mockQueryBuilder.innerJoin).toHaveBeenCalledWith('property.advertisement', 'advertisement');
    expect(mockQueryBuilder.select).toHaveBeenCalledWith('advertisement.propertyType', 'propertyType');
    expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith('COUNT(property.id)', 'propertyCount');
    expect(mockQueryBuilder.where).toHaveBeenCalledWith('property.active = :active', { active: true });
    expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith('advertisement.propertyType');
    expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();
    expect(result).toEqual(mockPropertyTypeDistribution);
  });
})

it('should return average prices grouped by sector', async () => {
  const mockAveragePrices = [
    { sector: 'INDUSTRIAL', price: 1500.50 },
    { sector: 'AGRICULTURAL', price: 1200.75 },
  ];
   // Mock `createQueryBuilder`
  const mockQueryBuilder = {
    innerJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getRawMany: jest.fn().mockResolvedValue(mockAveragePrices),
  };

  const mockRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
  };

  (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

  const result = await propertyService.getAveragePricesBySector();

  expect(AppDataSource.getRepository).toHaveBeenCalledWith(Property);
  expect(mockQueryBuilder.innerJoin).toHaveBeenCalledWith('property.advertisement', 'advertisement');
  expect(mockQueryBuilder.select).toHaveBeenCalledWith('property.sector', 'sector');
  expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith('ROUND(AVG(advertisement.price), 2)', 'price');
  expect(mockQueryBuilder.where).toHaveBeenCalledWith('property.active = :active', { active: true });
  expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith('property.sector');
  expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('price', 'DESC');
  expect(mockQueryBuilder.getRawMany).toHaveBeenCalled();
  expect(result).toEqual(mockAveragePrices);
});

it('should return properties with valuation and pagination details', async () => {
  const mockProperties = [
    { id: 1, sector: 'INDUSTRIAL', area: 100, valuation: 200000.00 },
    { id: 2, sector: 'AGRICULTURAL', area: 150, valuation: 300000.00 },
  ];
  const mockTotal = 20;
  const mockPaginationParams = { limit: 10, page: 1 };

  (getPaginationParams as jest.Mock).mockReturnValue(mockPaginationParams);

  const mockQueryBuilder = {
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    getRawMany: jest.fn().mockResolvedValue(mockProperties),
    getCount: jest.fn().mockResolvedValue(mockTotal),
  };

  const mockRepository = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
  };

  (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

  const result = await propertyService.getPropertiesWithValuation({ page: 1, perPage: 10 });

  expect(getPaginationParams).toHaveBeenCalledWith(1, 10);
  expect(AppDataSource.getRepository).toHaveBeenCalledWith(Property);

  expect(mockQueryBuilder.select).toHaveBeenCalledWith('property.*');
  expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith(
    'Round(avg_prices.avg_price * property.area, 2)',
    'valuation'
  );
  expect(mockQueryBuilder.innerJoin).toHaveBeenCalledTimes(1);
  expect(mockQueryBuilder.where).toHaveBeenCalledWith(
    'property.active = :active',
    { active: true }
  );
  expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith(
    'property.createdAt',
    'DESC'
  );
  expect(mockQueryBuilder.offset).toHaveBeenCalledWith(1);
  expect(mockQueryBuilder.limit).toHaveBeenCalledWith(10);

  expect(result).toEqual({
    properties: mockProperties,
    pagination: {
      total: mockTotal,
      currentPage: 1,
      totalPages: 2,
      perPage: 10,
    },
  });
});
