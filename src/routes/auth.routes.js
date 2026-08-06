import { Router } from "express";
import { register, login, profile } from "../controllers/auth.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import authRequired from "../middlewares/authRequired.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.get("/profile", authRequired, profile);

export default router;
