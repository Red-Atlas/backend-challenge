import { Request, Response, NextFunction } from 'express';
import { propertyService } from './property.service.js';
import { TPaginationProperty } from './property.dto';
import { TSortingType } from 'components/utils/sorting';

export async function getProperty(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params;
  try {
    const property = await propertyService.findOne({ filter: { ...req.body, id } });
    return res.status(200).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
}

export async function getProperties(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const properties = await propertyService.find(req.body);
    return res.status(200).json({ success: true, data: properties });
  } catch (error) {
    next(error);
  }
}

export async function createProperty(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const property = await propertyService.create(req.body);
    return res.status(200).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
}

export async function updateProperty(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const property = await propertyService.update({ id, data: req.body });
    return res.status(200).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
}

export async function deleteProperty(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const property = await propertyService.deleteProperty(id);
    return res.status(200).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
}

export async function inactiveProperty(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const property = await propertyService.inactiveProperty(id);
    return res.status(200).json({ success: true, data: property });
  } catch (error) {
    next(error);
  }
}

export async function getPropertiesPagination(
  req: Request, res: Response, next: NextFunction
): Promise<any> {
  const data = req.query as unknown as TPaginationProperty & TSortingType;
    try {
      const propertyPagination = await propertyService.getPropertiesPagination(data)
      return res.status(200).json({ success: true, data: propertyPagination })
    } catch (error) {
      next(error);
    }
};

export async function getDistributionBySector(
  req: Request, res: Response, next: NextFunction
): Promise<any> {
  try {
    const propertiesBySector = await propertyService.getDistributionBySector()
    return res.status(200).json({ success: true, data: propertiesBySector })
  } catch (error) {
    next(error);
  }
};

export async function getPropertiesByType(
  req: Request, res: Response, next: NextFunction
): Promise<any> {
  try {
    const propertiesByType = await propertyService.getPropertiesByType()
    return res.status(200).json({ success: true, data: propertiesByType })
  } catch (error) {
    next(error);
  }
};

export async function getAveragePricesBySector(
  req: Request, res: Response, next: NextFunction
): Promise<any> {
  try {
    const avgPriceBySector = await propertyService.getAveragePricesBySector()
    return res.status(200).json({ success: true, data: avgPriceBySector })
  } catch (error) {
    next(error);
  }
};

export async function getPropertiesWithValuation(
  req: Request, res: Response, next: NextFunction
): Promise<any> {
  const data = req.query as unknown as TPaginationProperty & TSortingType;
  try {
    const propertiesWithValuation = await propertyService.getPropertiesWithValuation(data)
    return res.status(200).json({ success: true, data: propertiesWithValuation })
  } catch (error) {
    next(error);
  }
};