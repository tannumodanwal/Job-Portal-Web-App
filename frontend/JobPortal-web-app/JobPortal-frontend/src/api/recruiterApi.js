import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

import api from "../utils/axiosConfig";


// 🔹 GET logged-in recruiter profile
export const getRecruiterProfileApi = async (userId) => {
  const res = await api.get(`/recruiter/profile/${userId}`);
  return res.data; 
}; 

// 🔹 UPDATE recruiter profile
export const updateRecruiterProfileApi = async (userId, profileData) => {
  const res = await api.put(`/recruiter/profile/${userId}`, profileData);
  return res.data;
};

export const uploadRecruiterPhotoApi = async (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post(`/file/upload/profile/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const getRecruiterPhotoUrl = (fileName) => {
  if (!fileName) return null;
  return `http://localhost:8080/uploads/profile/${fileName}`;
};

