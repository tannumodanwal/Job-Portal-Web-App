import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

import api from "../utils/axiosConfig";


// 1️⃣ POST NEW JOB
export const postJobApi = async (recruiterId, jobData) => {
  const res = await api.post(`/jobs/post/${recruiterId}`, jobData);
  return res.data;
};

// 2️⃣ GET ALL JOBS OF A RECRUITER
export const getJobsByRecruiterApi = async (recruiterId) => {
  const res = await api.get(`/jobs/recruiter/${recruiterId}`);
  return res.data;
};

// 3️⃣ GET SINGLE JOB DETAILS 
export const getJobDetailsApi = async (jobId) => {
  const res = await api.get(`/jobs/${jobId}`);
  return res.data;
}; 

// 6️⃣ UPDATE JOB
export const updateJobApi = async (jobId, jobData) => {
  const res = await api.put(`/jobs/${jobId}`, jobData);
  return res.data;
};


// 4️⃣ DELETE A JOB
export const deleteJobApi = async (jobId) => {
  const res = await api.delete(`/jobs/${jobId}`);
  return res.data;
};

export const searchJobsApi = async (keyword, location, filters) => {
  const res = await api.get(`/jobs/search`, {
    params: {
      keyword,
      location,
      jobType: filters.employment,
      remoteType: filters.remote,
      dateRange: filters.date,
    }
  }); 
  return res.data;
};

export const getApplicationsForJobApi = async (jobId) => {
  const res = await api.get(`/apply/jobs/${jobId}/applications`);
  return res.data;
};


export const acceptApplicationApi = async (appId) => {
  return api.put(`/apply/${appId}/accept`);
};

export const rejectApplicationApi = async (appId) => {
  return api.put(`/apply/${appId}/reject`);
};
