import { Router } from "express";
import {
  analyzeResumeController,
  deleteResumeController,
  resumeAnalyzeHistoryController,
  viewResumeAnalyzeController,
} from "../controllers/resume.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const resumeRouter = Router();

resumeRouter.post("/analyze", protectRoute, analyzeResumeController);
resumeRouter.get("/history", protectRoute, resumeAnalyzeHistoryController);

resumeRouter.get("/:resumeId", protectRoute, viewResumeAnalyzeController);

resumeRouter.delete("/delete/:resumeId", protectRoute, deleteResumeController);

export default resumeRouter;
