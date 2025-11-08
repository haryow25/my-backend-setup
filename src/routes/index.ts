import { Router } from "express";
import userRoutes from "./users/user.routes";
import authRoutes from "./auth/auth.routes";
import { authenticateJWT } from "../middlewares/auth.middleware";

export const router = Router();

router.use("/auth", authRoutes);
router.use("/users", authenticateJWT, userRoutes); // example: users endpoints now protected
