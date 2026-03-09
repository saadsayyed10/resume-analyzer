import { Router } from "express";
import {
  analyzeResumeController,
  deleteResumeController,
  resumeAnalyzeHistoryController,
  viewResumeAnalyzeController,
} from "../controllers/resume.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../lib/multer.js";

const resumeRouter = Router();

resumeRouter.post(
  "/analyze",
  protectRoute,
  upload.single("resume"),
  analyzeResumeController,
);
resumeRouter.get("/history", protectRoute, resumeAnalyzeHistoryController);

resumeRouter.get("/:resumeId", protectRoute, viewResumeAnalyzeController);

resumeRouter.delete("/delete/:resumeId", protectRoute, deleteResumeController);

export default resumeRouter;
