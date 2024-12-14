import { Router } from "express";

import property from "../controllers/property.controller";

const router = Router();

router.get("/stats/sectors", property.groupAndCountBySector);
router.get("/stats/sectors/prices", property.getAveragePriceBySector);

router.get("/locations", property.locations);

router.post("/", property.create);
router.get("/", property.findAll);
router.get("/:id", property.findById);
router.patch("/:id", property.updateById);
router.delete("/:id", property.deleteById);

export default router;
