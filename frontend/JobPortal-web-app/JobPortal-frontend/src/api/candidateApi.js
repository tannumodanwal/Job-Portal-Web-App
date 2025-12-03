
import axios from "axios";
import { BASE_API_URL } from "../utils/constants";


import api from "../utils/axiosConfig";

export const updateCandidateProfileApi = async (userId, profileData) => {
  const res = await api.put(`/candidate/profile/${userId}`, profileData);
  return res.data;
};
  
export const uploadCandidatePhotoApi = async (userId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post(`/file/upload/profile/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }); 

  return res.data;
};

export const getCandidatePhotoUrl = (fileName) => {
  if (!fileName) return null;
  return `http://localhost:9000/uploads/profile/${fileName}`;
};

export const getCandidateProfileApi = async (userId) => {
  const res = await api.get(`/candidate/profile/${userId}`);
  return res.data;
};
 
export const saveJobApi = async (userId, jobId) => {
  const res = await api.post(`/candidate/save-job/${userId}/${jobId}`);
  return res.data;
};

export const getSavedJobsApi = async (userId) => {
  const res = await api.get(`/candidate/saved-jobs/${userId}`);
  return res.data;
};

export const applyJobApi = async (userId, jobId, candidateResumeLink) => {
  const res = await api.post(`/apply/${userId}/${jobId}`, {
    candidateResumeLink: candidateResumeLink,
  });
  return res.data;
};

export const getApplicationsForJobApi = async (jobId) => {
  const res = await api.get(`/apply/job/${jobId}`);
  return res.data;
};

export const getAppliedJobsApi = async (userId) => {
  const res = await api.get(`/apply/applied-jobs/${userId}`);
  return res.data;
};
