import axios from "axios";
import prisma from "../lib/prisma.orm.js";

export const analyzeResumeService = async (jobDescription, userId) => {
  const res = await axios.post(process.env.AI_URL, {
    job_description: jobDescription.trim(),
  });
  return await prisma.resumes.create({
    data: {
      job_description: jobDescription,
      response: res.data.response,
      users_id: userId,
    },
  });
};

export const resumeAnalyzeHistoryService = async (userId) => {
  return await prisma.resumes.findMany({
    where: {
      users_id: userId,
    },
  });
};
