import { Router } from "express";

import property from "../controllers/property.controller";

import checkRole from "../middlewares/checkRole.mid";
import passportCb from "../middlewares/passportCb.mid";

import { Role } from "../schemas/role.enum";

const router = Router();

router.get(
  "/stats/sectors",
  passportCb("jwt"),
  checkRole([Role.ADMIN]),
  property.groupAndCountBySector
);
router.get(
  "/stats/sectors/prices",
  passportCb("jwt"),
  checkRole([Role.ADMIN]),
  property.getAveragePriceBySector
);

router.get(
  "/locations",
  passportCb("jwt"),
  checkRole([Role.ADMIN]),
  property.locations
);

router.post(
  "/",
  passportCb("jwt"),
  checkRole([Role.USER, Role.ADMIN]),
  property.create
);

router.get("/", /*checkRole([Role.USER, Role.ADMIN]), */ property.findAll);

router.get("/:id", checkRole([Role.USER, Role.ADMIN]), property.findById);

router.put(
  "/:id",
  passportCb("jwt"),
  checkRole([Role.USER, Role.ADMIN]),
  property.updateById
);

router.delete(
  "/:id",
  passportCb("jwt"),
  checkRole([Role.ADMIN]),
  property.deleteById
);

export default router;
