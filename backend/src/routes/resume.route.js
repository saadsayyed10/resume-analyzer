import { Router } from "express";
import { analyzeResumeController } from "../controllers/resume.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const resumeRouter = Router();

resumeRouter.post("/analyze", protectRoute, analyzeResumeController);

export default resumeRouter;
