import { Request, Response, NextFunction } from "express";
import * as userService from "../../services/users/user.service";
import { successResponse } from "../../utils/response";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    successResponse(res, users);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const user = await userService.createUser(name, email);
    successResponse(res, user, 201);
  } catch (err) {
    next(err);
  }
};
