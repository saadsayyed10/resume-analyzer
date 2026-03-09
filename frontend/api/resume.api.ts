import axios from "axios";
import { API_URL } from "./apiUrl";

export const fetchResumeHistoryAPI = async (token: string) => {
  return await axios.get(`${API_URL}/resume/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const analyzeResumeAPI = async (
  jobDescription: string,
  token: string,
) => {
  return await axios.post(
    `${API_URL}/resume/analyze`,
    { jobDescription },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteResumeAPI = async (resumeId: string, token: string) => {
  return await axios.delete(`${API_URL}/resume/delete/${resumeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
