import { Router } from "express";
import {
  register,
  login,
  profile,
  logout,
} from "../controllers/auth.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import authRequired from "../middlewares/authRequired.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

export default router;
