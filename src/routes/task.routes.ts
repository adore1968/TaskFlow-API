import { Router } from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";
import authRequired from "../middlewares/authRequired.js";

const router = Router();

router.get("/project/:projectId", authRequired, getTasks);

router.get("/:id", authRequired, getTask);

router.post("/", validateSchema(createTaskSchema), authRequired, createTask);

router.put("/:id", validateSchema(updateTaskSchema), authRequired, updateTask);

router.delete("/:id", authRequired, deleteTask);

export default router;
