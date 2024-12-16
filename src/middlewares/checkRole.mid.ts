import { Request, Response, NextFunction } from "express";

function checkRole(allowedRoles: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRol = req["_user"]?.role;

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
