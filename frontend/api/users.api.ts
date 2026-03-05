import axios from "axios";
import { API_URL } from "./apiUrl";

export const loginUser = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/users/login`, { email, password });
};
