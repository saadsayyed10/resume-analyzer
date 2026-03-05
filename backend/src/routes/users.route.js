import { Router } from "express";
import {
  loginUserController,
  registerUserController,
  userProfileController,
} from "../controllers/users.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const userRoutes = Router();

userRoutes.post("/register", registerUserController);
userRoutes.post("/login", loginUserController);

userRoutes.get("/profile", protectRoute, userProfileController);

export default userRoutes;
