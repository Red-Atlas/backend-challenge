import { NextFunction, Request, Response } from "express";
import { authService } from "../components/auth/auth.service";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const token = req.headers.authorization;

  try {
    if (!token) {
      throw new Error('Unauthorized: Token not provided')
    }
    
    const user = await authService.currentUser(token);

    if (!user) {
      throw new Error('Unauthorized: Invalid user')
    }
    
    next();
  } catch (error) {
    next(error)
  }
}
