import { Router } from "express";

import Transaction from "../controllers/transaction.controller";

const router = Router();

router.post("/", Transaction.create);
router.get("/", Transaction.findAll);
router.get("/:id", Transaction.findById);
router.patch("/:id", Transaction.updateById);
router.delete("/:id", Transaction.deleteById);

export default router;
