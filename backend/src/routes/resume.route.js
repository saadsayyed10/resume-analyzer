import { Router } from "express";
import {
  analyzeResumeController,
  deleteResumeController,
  resumeAnalyzeHistoryController,
} from "../controllers/resume.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const resumeRouter = Router();

resumeRouter.post("/analyze", protectRoute, analyzeResumeController);
resumeRouter.get("/history", protectRoute, resumeAnalyzeHistoryController);

resumeRouter.delete("/delete/:resumeId", protectRoute, deleteResumeController);

export default resumeRouter;
