import { Request, Response, NextFunction } from "express";
import { Role } from "../entities/Auth.entity";

function checkRole(allowedRoles: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (allowedRoles.includes(Role.PUBLIC)) return next();

      const userRol = req["_user"]?.role || Role.PUBLIC;

      if (!allowedRoles.includes(userRol)) {
        const error = new Error(
          "No posee los permisos suficientes para acceder"
        );
        error["statusCode"] = 403;

        throw error;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default checkRole;
