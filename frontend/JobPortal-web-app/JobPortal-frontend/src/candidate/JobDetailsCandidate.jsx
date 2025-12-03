import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobDetailsApi } from "../api/jobApi";
import { saveJobApi, applyJobApi, getSavedJobsApi, getAppliedJobsApi } from "../api/candidateApi";
import Footer from "../pages/auth/Footer";
import { getCandidateProfileApi,getApplicationsForJobApi  } from "../api/candidateApi";

  const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);  // ⭐ NEW
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [candidateResumeLink, setCandidateResumeLink] = useState("");
  const [candidateProfile, setCandidateProfile] = useState(null);

  // Fetch candidate profile for auto-fill
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const p = await getCandidateProfileApi(user.id);
        setCandidateProfile(p);
      } catch (err) {
        console.log("No candidate profile found");
      }
    };
    fetchProfile();
  }, []);

  // Fetch Job Details 
  useEffect(() => {
    const fetchJob = async () => {
      const res = await getJobDetailsApi(jobId);
      setJob(res);
    };
    fetchJob();
  }, [jobId]);

  // Check if already saved
  useEffect(() => {
    const checkSaved = async () => {
      const saved = await getSavedJobsApi(user.id);
      const savedIds = saved.map(j => j.id);
      if (savedIds.includes(Number(jobId))) setIsSaved(true);
    };
    checkSaved();
  }, [jobId]);

  useEffect(() => {
  const fetchAppStatus = async () => {
    const apps = await getApplicationsForJobApi(jobId);

    const myApp = apps.find(a => a.candidate.id === user.id);

    if (myApp) {
      setIsApplied(true);
      setApplicationStatus(myApp.status);
    }
  };

  fetchAppStatus();
}, [jobId]);


  if (!job) return <div className="text-center p-10">Loading...</div>;

  const handleSave = async () => {
    await saveJobApi(user.id, jobId);
    setIsSaved(true);
    navigate("/candidate/dashboard");
  };

   // ⭐ SUBMIT APPLICATION WITH RESUME URL
  const handleSubmitApplication = async () => {
    if (!candidateResumeLink.trim()) {
      alert("Please enter resume URL");
      return;
    }

    try {
      await applyJobApi(user.id, jobId, candidateResumeLink);
      setIsApplied(true);
      setApplicationStatus("PENDING");  
      alert("Application Submitted Successfully!");
      setShowApplyModal(false);
    } catch (e) {
      alert("You have already applied!");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER BAR */}
      <div className="bg-[#082f49] text-white px-10 py-4 shadow flex justify-between">
        <h1 className="text-3xl font-extrabold">
          hotdevjobs<span className="text-orange-500">.com</span>
        </h1>

        <button
          onClick={() => navigate("/candidate/dashboard")}
          className="text-sm underline"
        >
          Back to Search Results
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <div className="max-w-5xl mx-auto mt-10 p-10 bg-white rounded-xl shadow">

          <h1 className="text-4xl font-bold mb-4">Job Details</h1>

          <h2 className="text-2xl font-semibold text-blue-700">{job.title}</h2>
          <p className="text-gray-600">{job.city}, {job.state}</p>
          <p className="text-gray-600 mb-5">{job.companyName}</p>

          <hr className="my-5" />

          <h3 className="text-xl font-semibold mb-3">Job Specs</h3>

          <div className="grid grid-cols-3 gap-4 text-gray-700">
            <p><strong>Date Posted:</strong> {job.postedDate}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Type:</strong> {job.jobType}</p>
            <p><strong>Remote:</strong> {job.remoteType}</p>
          </div>

          <hr className="my-6" />

          <h3 className="text-xl font-semibold mb-3">Job Description</h3>
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">
              <button
                onClick={() => setShowApplyModal(true)}
                disabled={isApplied}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  isApplied ? "bg-green-700" : "bg-orange-500"
                } text-white`}
              >
                {isApplied 
                  ? `Applied (${applicationStatus || "Pending"})`
                  : "Apply Now"}
              </button>

             <button
                onClick={handleSave}
                className={`px-6 py-3 rounded-lg font-semibold ${
                  isSaved ? "bg-green-600" : "bg-red-600"
                } text-white`}
              >
                {isSaved ? "Saved ✓" : "Save Job"}
              </button>
          </div>

        </div>
      </div>

    </div>
    {/* ⭐ APPLY MODAL */}
      {showApplyModal && candidateProfile && (
<div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex justify-center items-center z-50">

<div className="bg-white w-[600px] p-8 rounded-xl max-h-[80vh] overflow-y-auto shadow-xl">

            <h2 className="text-2xl font-bold mb-5 text-center">Apply for this Job</h2>

            {/* Name */}
            <label className="font-medium">Name</label>
            <input
              type="text"
              value={candidateProfile.firstName + " " + candidateProfile.lastName}
              disabled
              className="w-full border px-4 py-2 rounded mb-4 bg-gray-100"
            />

            {/* Email */}
            <label className="font-medium">Email</label>
            <input
              type="text"
              value={user.email}
              disabled
              className="w-full border px-4 py-2 rounded mb-4 bg-gray-100"
            />

            {/* Phone */}
            <label className="font-medium">Phone</label>
            <input
              type="text"
              value={candidateProfile.phoneNumber}
              disabled
              className="w-full border px-4 py-2 rounded mb-4 bg-gray-100"
            />

            {/* Skills */}
            <label className="font-medium">Skills</label>
            <input
              type="text"
              value={candidateProfile.skillName}
              disabled
              className="w-full border px-4 py-2 rounded mb-4 bg-gray-100"
            />

            {/* Qualification */}
            <label className="font-medium">Qualification</label>
            <input
              type="text"
              value={candidateProfile.qualification}
              disabled
              className="w-full border px-4 py-2 rounded mb-4 bg-gray-100"
            />

            {/* Resume Link */}
            <label className="font-medium">Resume Link</label>
            <input
              type="text"
              placeholder="Paste your resume URL"
              className="w-full border px-4 py-2 rounded mb-4"
              value={candidateResumeLink}
              onChange={(e) => setCandidateResumeLink(e.target.value)}
            />

            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-400 text-white px-6 py-2 rounded"
                onClick={() => setShowApplyModal(false)}
              >
                Close
              </button>

              <button
                className="bg-green-600 text-white px-6 py-2 rounded"
                onClick={handleSubmitApplication}
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}
          <Footer />

    </>
  );
};

export default JobDetails;
