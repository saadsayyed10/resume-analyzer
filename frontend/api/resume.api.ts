import axios from "axios";
import { API_URL } from "./apiUrl";

export const fetchResumeHistoryAPI = async (token: string) => {
  return await axios.get(`${API_URL}/resume/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
