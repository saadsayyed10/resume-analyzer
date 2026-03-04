import { Router } from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/users.controller.js";

const userRoutes = Router();

userRoutes.post("/register", registerUserController);
userRoutes.post("/login", loginUserController);

export default userRoutes;
