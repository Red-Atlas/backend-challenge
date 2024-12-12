import { Router } from "express";

import auth from "./auth.routes";
import property from "./property.routes";
import transactions from "./transaction.routes";
import advertisements from "./advertisement.routes";

import queryBuilder from "../middlewares/queryBuilder";
import checkRole from "../middlewares/checkRole.mid";
import passportCb from "../middlewares/passportCb.mid";

import { Role } from "../schemas/role.enum";

const router = Router();

router.use("/auth", auth);
router.use(
  "/properties",
  queryBuilder,
  /*passportCb("jwt"), checkRole([Role.USER]),*/
  property
);
router.use("/transactions", queryBuilder, transactions);
router.use("/advertisement", queryBuilder, advertisements);

export default router;
