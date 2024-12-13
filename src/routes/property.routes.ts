import { Router } from "express";

import property from "../controllers/property.controller";

const router = Router();

router.get("/stats/sector", property.groupAndCountBySector);

router.post("/", property.create);
router.get("/", property.findAll);
router.get("/:id", property.findById);
router.patch("/:id", property.updateById);
router.delete("/:id", property.deleteById);

export default router;
