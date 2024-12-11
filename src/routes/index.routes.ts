import { Router } from "express";

import auth from "./auth.routes";
import property from "./property.routes";
import transactions from "./transaction.routes";
import advertisements from "./advertisement.routes";

const router = Router();

router.use("/auth", auth);
router.use("/properties", property);
router.use("/transactions", transactions);
router.use("/advertisement", advertisements);

export default router;
