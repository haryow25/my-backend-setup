import { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(500).json({
    status: 500,
    message: err.message || "Internal Server Error",
  });
}
