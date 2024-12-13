import { NextFunction, Request, Response } from "express";

import Property from "../services/property.service";
import BaseController from "./base.controller";

class PropertyController extends BaseController {
  constructor() {
    super(Property);
  }

  async groupAndCountBySector(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Property.getBySector();

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

export default new PropertyController();
