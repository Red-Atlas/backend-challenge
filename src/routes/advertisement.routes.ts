import { Router } from "express";

import advertisement from "../controllers/advertisement.controller";

const router = Router();

router.post("/", advertisement.create);
router.get("/", advertisement.findAll);
router.get("/:id", advertisement.findById);
router.patch("/:id", advertisement.updateById);
router.delete("/:id", advertisement.deleteById);

export default router;
