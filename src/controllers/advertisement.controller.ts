import { NextFunction, Request, Response } from "express";

import BaseController from "./base.controller";
import Advertisement from "../services/advertisement.service";

class AdvertisementController extends BaseController {
  constructor() {
    super(Advertisement);
  }

  async getPropertiesByType(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Advertisement.getPropertiesByType();

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

export default new AdvertisementController();
