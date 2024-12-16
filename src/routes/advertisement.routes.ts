import { Router } from "express";

import advertisement from "../controllers/advertisement.controller";

import checkRole from "../middlewares/checkRole.mid";
import passportCb from "../middlewares/passportCb.mid";

import { Role } from "../schemas/role.enum";

const router = Router();

router.get(
  "/stats/type",
  passportCb("jwt"),
  checkRole([Role.USER, Role.ADMIN]),
  advertisement.getPropertiesByType
);

router.post(
  "/",
  passportCb("jwt"),
  checkRole([Role.USER, Role.ADMIN]),
  advertisement.create
);

router.get("/", advertisement.findAll);

router.get("/:id", advertisement.findById);

router.put(
  "/:id",
  passportCb("jwt"),
  checkRole([Role.USER, Role.ADMIN]),
  advertisement.updateById
);

router.delete(
  "/:id",
  passportCb("jwt"),
  checkRole([Role.ADMIN]),
  advertisement.deleteById
);

export default router;
