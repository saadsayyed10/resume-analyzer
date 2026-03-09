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
  file: File,
  jobDescription: string,
  token: string,
) => {
  const formData = new FormData();

  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  return await axios.post(`${API_URL}/resume/analyze`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteResumeAPI = async (resumeId: string, token: string) => {
  return await axios.delete(`${API_URL}/resume/delete/${resumeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const viewResumeAPI = async (resumeId: string, token: string) => {
  return await axios.get(`${API_URL}/resume/${resumeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
