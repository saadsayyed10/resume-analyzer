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
  job_description: string,
  token: string,
) => {
  return await axios.post(
    `${API_URL}/resume/analyze`,
    { job_description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
