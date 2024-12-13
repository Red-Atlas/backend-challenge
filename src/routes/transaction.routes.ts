import { Router } from "express";

import transaction from "../controllers/transaction.controller";

const router = Router();

router.get("/stats/date", transaction.getMovementsByPeriod);

router.post("/", transaction.create);
router.get("/", transaction.findAll);
router.get("/:id", transaction.findById);
router.patch("/:id", transaction.updateById);
router.delete("/:id", transaction.deleteById);

export default router;
