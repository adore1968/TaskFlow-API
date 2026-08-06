import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
} from "../controllers/task.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/", getTasks);

router.post("/", validateSchema(createTaskSchema), getTasks);

router.put("/:taskId", validateSchema(updateTaskSchema), getTasks);

export default router;
