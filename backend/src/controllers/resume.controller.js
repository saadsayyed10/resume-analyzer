import * as resumeService from "../services/resume.service.js";

export const analyzeResumeController = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User token not provided" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Required PDF file is missing" });
    }

    const pdfPath = req.file.path;

    const { jobDescription } = req.body;

    const resume = await resumeService.analyzeResumeService(
      pdfPath,
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

export const resumeAnalyzeHistoryController = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User token not provided" });
    }

    const resume = await resumeService.resumeAnalyzeHistoryService(req.user.id);
    res.status(200).json({
      total: resume.length,
      data: resume,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteResumeController = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User token not provided" });
    }

    const { resumeId } = req.params;
    if (!resumeId) {
      return res.status(404).json({ error: "Resume ID not found" });
    }

    await resumeService.deleteResumeService(req.user.id, resumeId);
    res.status(200).json({
      message: "Resume deleted",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const viewResumeAnalyzeController = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User token not provided" });
    }

    const { resumeId } = req.params;
    if (!resumeId) {
      return res.status(404).json({ error: "Resume ID not found" });
    }

    const resume = await resumeService.viewResumeAnalyzeService(
      req.user.id,
      resumeId,
    );
    res.status(200).json({
      data: resume,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
