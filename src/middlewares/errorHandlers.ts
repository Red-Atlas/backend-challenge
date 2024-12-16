import { NextFunction, Request, Response } from 'express';

interface ErrorCodes extends Error {
  status?: number;
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`${req.method} ${req.originalUrl} not found`) as ErrorCodes
  error.status = 404;
  next(error);
}

export function errorHandler(error: ErrorCodes, req: Request, res: Response, next: NextFunction) {
  error['status'] = error['status'] || 500;
  res.status(error.status).json({
    success: false,
    message: error.message,
  })
}
