import { Router } from "express";
import {
  analyzeResumeController,
  resumeAnalyzeHistoryController,
} from "../controllers/resume.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const resumeRouter = Router();

resumeRouter.post("/analyze", protectRoute, analyzeResumeController);
resumeRouter.get("/history", protectRoute, resumeAnalyzeHistoryController);

export default resumeRouter;
