import { Response } from "express";

export const successResponse = (res: Response, data: any, status: number = 200, message: string = "Success") => {
  return res.status(status).json({ status, message, data });
};

export const errorResponse = (res: Response, message = "Error", status = 500) => res.status(status).json({ status, message });
