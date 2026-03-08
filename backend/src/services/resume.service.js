import axios from "axios";
import prisma from "../lib/prisma.orm.js";

export const analyzeResumeService = async (jobDescription, userId) => {
  const res = await axios.post(process.env.AI_URL, { jobDescription });
  return await prisma.resumes.create({
    data: {
      job_description: jobDescription,
      response: res.data.response,
      users_id: userId,
    },
  });
};
