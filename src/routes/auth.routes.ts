import { Router } from "express";

import passportCb from "../middlewares/passportCb.mid";

import auth from "../controllers/auth.controller";

const router = Router();

router.post("/signup", passportCb("register"), auth.signUp);
router.post("/signin", passportCb("login"), auth.signIn);

export default router;
