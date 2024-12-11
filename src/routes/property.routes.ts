import { Router } from "express";

import Property from "../controllers/property.controller";

const router = Router();

router.post("/", Property.create);
router.get("/", Property.findAll);
router.get("/:id", Property.findById);
router.patch("/:id", Property.updateById);
router.delete("/:id", Property.deleteById);

export default router;
