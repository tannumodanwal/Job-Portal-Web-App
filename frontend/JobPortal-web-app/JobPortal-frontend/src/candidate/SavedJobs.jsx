import React, { useEffect, useState } from "react";
import { getSavedJobsApi } from "../api/candidateApi";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../pages/auth/Footer";

const SavedJobs = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaved = async () => {
      const res = await getSavedJobsApi(user.id);
      setJobs(res);
    };
    fetchSaved();
  }, []);
 
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex">

      {/* ================= LEFT SIDEBAR ================= */}
      <div className="w-72 bg-[#082f49] text-white p-8 min-h-screen">
        <h1 className="text-2xl font-bold cursor-pointer">
          hotdevjobs<span className="text-orange-500">.com</span>
        </h1>
      </div>

      {/* ================= RIGHT CONTENT ================= */}
      <div className="flex-1">

        {/* TOP NAVBAR */}
        <div className="bg-[#082f49] text-white px-10 py-4 shadow flex justify-end">
         

          <button
            onClick={() => navigate("/candidate/dashboard")}
            className="text-sm underline"
          >
            Back to Dashboard
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-5xl mx-auto mt-10 p-10 bg-white rounded-xl shadow">
          <h1 className="text-3xl font-bold mb-5">Saved Jobs</h1>

          {jobs.length === 0 ? (
            <p>No saved jobs.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
                <div
                  key={job.id}
                  className="flex justify-between bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <Link
                    to={`/candidate/job/${job.id}`}
                    className="text-lg font-semibold text-blue-700"
                  >
                    {job.title}
                  </Link>

                  <p className="text-gray-600">{job.city}, {job.state}</p>
                  <p className="font-semibold">{job.companyName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SavedJobs;
