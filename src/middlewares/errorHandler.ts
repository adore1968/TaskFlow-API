import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error);

  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
