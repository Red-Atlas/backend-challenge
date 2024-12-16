import { Router } from "express";

import transaction from "../controllers/transaction.controller";

import checkRole from "../middlewares/checkRole.mid";
import passportCb from "../middlewares/passportCb.mid";

import { Role } from "../schemas/role.enum";

const router = Router();

router.get(
  "/stats/date",
  passportCb("jwt"),
  checkRole([Role.ADMIN]),
  transaction.getMovementsByPeriod
);

router.post(
  "/",
  passportCb("jwt"),
  checkRole([Role.USER, Role.ADMIN]),
  transaction.create
);

router.get(
  "/",
  passportCb("jwt"),
  checkRole([Role.USER, Role.ADMIN]),
  transaction.findAll
);

router.get(
  "/:id",
  passportCb("jwt"),
  checkRole([Role.USER, Role.ADMIN]),
  transaction.findById
);

router.put(
  "/:id",
  passportCb("jwt"),
  checkRole([Role.ADMIN]),
  transaction.updateById
);

router.delete(
  "/:id",
  passportCb("jwt"),
  checkRole([Role.ADMIN]),
  transaction.deleteById
);

export default router;
