import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

import api from "../utils/axiosConfig";

export const registerApi = async (formData) => {
  const res = await api.post("/auth/register", formData);
  return res.data;
};

 
// LOGIN
export const loginApi = async (email, password) => {
  const res = await api.post(`/auth/login`, { email, password });
  return res.data;
}; 

// GET LOGGED-IN USER PROFILE (after token)
export const getProfileApi = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
