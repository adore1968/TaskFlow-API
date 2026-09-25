import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

const validateSchema =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.issues.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      }

      return res.status(400).json({ message: "Validation error", errors: [] });
    }
  };

export default validateSchema;
