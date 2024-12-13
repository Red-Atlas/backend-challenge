import { Request, Response, NextFunction } from 'express';
import { propertyService } from './property.service';

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
