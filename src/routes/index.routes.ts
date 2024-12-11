import { Router } from "express";

import auth from "./auth.routes";
import property from "./property.routes";
import transactions from "./transaction.routes";
import advertisements from "./advertisement.routes";

import checkRole from "../middlewares/checkRole.mid";
import { Role } from "../schemas/role.enum";
import passportCb from "../middlewares/passportCb.mid";

const router = Router();

router.use("/auth", auth);
router.use(
  "/properties",
  /*passportCb("jwt"), checkRole([Role.USER]),*/
  property
);
router.use("/transactions", transactions);
router.use("/advertisement", advertisements);

export default router;
