import { Request, Response, NextFunction } from "express";
import * as authService from "../../services/auth/auth.service";
import { successResponse } from "../../utils/response";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.register(name, email, password);
    successResponse(res, { id: user.id, name: user.name, email: user.email }, 201);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    successResponse(res, { token });
  } catch (err) {
    next(err);
  }
};
