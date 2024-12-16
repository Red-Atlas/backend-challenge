import { NextFunction, Request, Response } from "express";

class authController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ response: "Usuario registrado con exito" });
    } catch (error) {
      next(error);
    }
  }
  static async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        response: "Usuario logueado con exito",
        token: req["token"],
      });
    } catch (error) {
      next(error);
    }
  }
}

export default authController;
