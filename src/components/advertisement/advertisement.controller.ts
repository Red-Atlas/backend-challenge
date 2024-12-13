import { Request, Response, NextFunction } from 'express';
import { advertisementService } from './advertisement.service';

export async function getAdvertisement(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params;
  try {
    const advertisement = await advertisementService.findOne({ filter: { ...req.body, id } });
    return res.status(200).json({ success: true, data: advertisement });
  } catch (error) {
    next(error);
  }
}

export async function getAdvertisements(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const advertisements = await advertisementService.find(req.body);
    return res.status(200).json({ success: true, data: advertisements });
  } catch (error) {
    next(error);
  }
}

export async function createAdvertisement(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const advertisement = await advertisementService.create(req.body);
    return res.status(200).json({ success: true, data: advertisement });
  } catch (error) {
    next(error);
  }
}

export async function updateAdvertisement(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const advertisement = await advertisementService.update({ id, data: req.body });
    return res.status(200).json({ success: true, data: advertisement });
  } catch (error) {
    next(error);
  }
}

export async function deleteAdvertisement(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const advertisement = await advertisementService.deleteAdvertisement(id);
    return res.status(200).json({ success: true, data: advertisement });
  } catch (error) {
    next(error);
  }
}

export async function inactiveAdvertisement(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const advertisement = await advertisementService.inactiveAdvertisement(id);
    return res.status(200).json({ success: true, data: advertisement });
  } catch (error) {
    next(error);
  }
}
