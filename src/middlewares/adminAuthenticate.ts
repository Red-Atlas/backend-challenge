import { NextFunction, Request, Response } from "express";
import { authService } from "../components/auth/auth.service";

export async function adminAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const token = req.headers.authorization;

  try {
    if (!token) {
      throw new Error('Unauthorized: Token not provided')
    }
    
    await authService.currentAdminUser(token);
    
    next();
  } catch (error) {
    next(error)
  }
}