import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';

export async function signUp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const token = await authService.signUp(req.body);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
}

export async function signIn(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { user, token } = await authService.signIn(req.body);
    return res.status(200).json({ success: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
}

export async function currentUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
    const token = req.headers.authorization;
  try {
    const user = await authService.currentUser(token!);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
}
