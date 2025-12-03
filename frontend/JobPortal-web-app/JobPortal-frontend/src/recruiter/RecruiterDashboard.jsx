import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRecruiterPhotoUrl } from "../api/recruiterApi";
import { getJobsByRecruiterApi } from "../api/jobApi";
import Footer from "../pages/auth/Footer";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  // Logged-in user (only id, email, role)
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // ⭐ Recruiter profile (name, photo, city...)
  const recruiterProfile = JSON.parse(localStorage.getItem("recruiterProfile"));

  const [jobs, setJobs] = useState([]);

  // ⭐ Avatar first letter
  const firstLetter = recruiterProfile?.firstName
    ? recruiterProfile.firstName.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase();

  // ⭐ Avatar photo
  const profilePhoto = getRecruiterPhotoUrl(recruiterProfile?.profilePhoto);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("recruiterProfile");
    navigate("/");
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobsByRecruiterApi(userId);
        setJobs(res);
      } catch (err) {
        console.log("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, [userId]);

  return (
    <>
      <div className="min-h-screen bg-gray-100">

        {/* 🔵 TOP NAVBAR */}
        <div className="w-full bg-[#082f49] text-white flex items-center px-10 py-4 shadow">

          {/* LEFT — Logo */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold cursor-pointer">
              hotdevjobs<span className="text-orange-500">.com</span>
            </h1>
          </div>

          {/* CENTER — Menu */}
          <div className="flex-1 flex justify-center gap-4 text-sm font-medium">
            <Link to="/recruiter/post-job" className="hover:text-orange-400 transition">
              📝 Post New Job
            </Link>

            <Link to="/recruiter/view-jobs" className="hover:text-orange-400 transition">
              👁 View Your Jobs
            </Link>

            <Link to="/recruiter/edit-profile" className="hover:text-orange-400 transition">
              ✏️ Edit Account
            </Link>
          </div>

          {/* RIGHT — Avatar + Logout */}
          <div className="flex-1 flex justify-end items-center gap-4">

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                firstLetter
              )}
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-semibold transition"
            >
              Logout
            </button>
          </div>

        </div>

        {/* DASHBOARD CONTENT */}
        <div className="px-14 mt-10">

          <h2 className="text-4xl font-bold mb-5">Recruiter Dashboard</h2>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-gray-700 max-w-5xl mx-auto">

            <h3 className="text-2xl font-bold mb-6">Search Results</h3>

            {jobs.length === 0 ? (
              <p className="text-gray-500 text-center py-5">
                No jobs found...
              </p>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex justify-between items-center bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/recruiter/job/${job.id}`)}
                  >
                    <div className="flex flex-col">
                      <div className="font-bold text-lg text-blue-700">{job.title}</div>

                      <span className="text-sm text-gray-600">
                        ({job.appliedCount} Candidates Applied)
                      </span>
                    </div>

                    <div className="text-gray-600">
                      {job.city}, {job.state}
                    </div>

                    <div className="font-semibold">{job.companyName}</div>
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

export default RecruiterDashboard;
