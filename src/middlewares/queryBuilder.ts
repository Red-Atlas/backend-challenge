import { NextFunction, Request, Response } from "express";

export default function parseQueryParam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const queryParsed = {};

  const operatorsMap = {
    gt: ">",
    lt: "<",
    gte: ">=",
    lte: "<=",
    eq: "=",
    ne: "!=",
  };

  for (const key in req.query) {
    queryParsed[key] = {};

    const subElement = req.query[key] as any;

    if (typeof subElement == "string") {
      queryParsed[key] = subElement;
      continue;
    }

    for (const subKey in subElement as object) {
      const operator = operatorsMap[subKey];

      if (!operator) {
        const error = new Error("Operador inválido");
        error["statusCode"] = 400;

        next(error);
      }

      queryParsed[key] = {
        [operator]: subElement[subKey],
      };
    }
  }

  req.query = queryParsed;

  next();
}
