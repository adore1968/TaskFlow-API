import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),

  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters long")
    .optional(),

  status: z
    .enum(["pending", "in_progress", "completed"], {
      error: "Invalid task status",
    })
    .default("pending"),

  priority: z
    .enum(["low", "medium", "high"], {
      error: "Invalid task priority",
    })
    .default("medium"),
  projectId: z.string({ error: "Project ID is required" }),
});

export const updateTaskSchema = z.object({
  title: createTaskSchema.shape.title.optional(),

  description: createTaskSchema.shape.description.optional(),

  status: createTaskSchema.shape.status.optional(),

  priority: createTaskSchema.shape.priority.optional(),
});
