import { NextFunction, Request, Response } from "express";

abstract class BaseController {
  private service;

  constructor(service) {
    this.service = service;

    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.create(req.body);

      res.status(201).json({ response: "Creación realizada con éxito" });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.findAll(req.query);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.findById(req.params.id);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedEntity = await this.service.updateById(
        req.params.id,
        req.body
      );

      res.status(200).json({
        data: updatedEntity,
        response: "Modificación realizada con éxito",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedEntity = await this.service.deleteById(req.params.id);

      res.status(200).json({
        data: deletedEntity,
        response: "Eliminación realizada con éxito",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BaseController;
