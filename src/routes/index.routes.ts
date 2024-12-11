import { Router } from "express";

import property from "./property.routes";
import transactions from "./transaction.routes";
import advertisements from "./advertisement.routes";

const router = Router();

router.use("/properties", property);
router.use("/advertisement", advertisements);
router.use("/transactions", transactions);

export default router;
