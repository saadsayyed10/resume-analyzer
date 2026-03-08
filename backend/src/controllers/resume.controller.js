import * as resumeService from "../services/resume.service.js";

export const analyzeResumeController = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User token not provided" });
    }

    const { jobDescription } = req.body;

    const resume = await resumeService.analyzeResumeService(
      jobDescription,
      req.user.id,
    );
    res.status(201).json({
      message: "Resume analyzing successful",
      jobDescription: jobDescription,
      result: resume.response,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
