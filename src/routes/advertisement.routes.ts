import { Router } from "express";

import Advertisement from "../controllers/advertisement.controller";

const router = Router();

router.post("/", Advertisement.create);
router.get("/", Advertisement.findAll);
router.get("/:id", Advertisement.findById);
router.patch("/:id", Advertisement.updateById);
router.delete("/:id", Advertisement.deleteById);

export default router;
