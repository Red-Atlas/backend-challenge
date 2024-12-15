import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params;
  try {
    const user = await userService.findOne({ filter: { ...req.body, id } });
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const users = await userService.find(req.body);
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const user = await userService.create(req.body);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const user = await userService.update({ id, data: req.body });
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const user = await userService.deleteUser(id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function inactiveUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { id } = req.params
  try {
    const user = await userService.inactiveUser(id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}