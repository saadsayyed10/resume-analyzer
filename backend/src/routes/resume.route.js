import { Router } from "express";
import { analyzeResumeController } from "../controllers/resume.controller.js";

const resumeRouter = Router();

resumeRouter.post("/analyze", analyzeResumeController);

export default resumeRouter;
