import { Request, Response } from "express";

function errorHandler(error, req: Request, res: Response, _next) {
  res.status(error.statusCode || 500).json({
    url: req.url,
    response: error.message,
    data: error.data || null,
    method: req.method,
  });
}

export default errorHandler;
