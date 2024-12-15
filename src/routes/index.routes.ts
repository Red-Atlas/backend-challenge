import { Router } from "express";

import auth from "./auth.routes";
import property from "./property.routes";
import transactions from "./transaction.routes";
import advertisements from "./advertisement.routes";

import queryBuilder from "../middlewares/queryBuilder";

const router = Router();

router.use("/auth", auth);
router.use("/properties", queryBuilder, property);
router.use("/transactions", queryBuilder, transactions);
router.use("/advertisements", queryBuilder, advertisements);

export default router;
