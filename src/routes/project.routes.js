import { Router } from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema.js";
import authRequired from "../middlewares/authRequired.js";

const router = Router();

router.get("/", authRequired, getProjects);

router.get("/:id", authRequired, getProject);

router.post(
  "/",
  authRequired,
  validateSchema(createProjectSchema),
  createProject,
);

router.put(
  "/:id",
  authRequired,
  validateSchema(updateProjectSchema),
  updateProject,
);

router.delete("/:id", authRequired, deleteProject);

export default router;
