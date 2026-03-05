import axios from "axios";
import { API_URL } from "./apiUrl";

export const loginUserAPI = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/users/login`, { email, password });
};

export const registerUserAPI = async (
  name: string,
  email: string,
  password: string,
) => {
  return await axios.post(`${API_URL}/users/register`, {
    name,
    email,
    password,
  });
};
