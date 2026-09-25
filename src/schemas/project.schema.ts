import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be at most 50 characters long"),

  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters long")
    .optional(),

  status: z
    .enum(["active", "completed", "archived"], {
      error: "Invalid project status",
    })
    .default("active"),
});

export const updateProjectSchema = createProjectSchema.partial();
