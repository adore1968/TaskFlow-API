import { Router } from "express";
import {
  getProjects,
  createProject,
  updateProject,
} from "../controllers/project.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema.js";

const router = Router();

router.get("/", getProjects);

router.post("/", validateSchema(createProjectSchema), createProject);

router.put("/:projectId", validateSchema(updateProjectSchema), updateProject);

export default router;
