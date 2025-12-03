import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  
  getSavedJobsApi,
  getAppliedJobsApi,
  getCandidateProfileApi,
} from "../api/candidateApi";

import {searchJobsApi }from "../api/jobApi";
import { getCandidatePhotoUrl } from "../api/candidateApi";
import Footer from "../pages/auth/Footer";

const CandidateDashboard = () => {
  const navigate = useNavigate();

  // Logged user base info
  const user = JSON.parse(localStorage.getItem("user"));

  // Candidate full profile
  const [candidateProfile, setCandidateProfile] = useState(
    JSON.parse(localStorage.getItem("candidateProfile")) || null
  );

  // Search + filters state
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);

  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const [filters, setFilters] = useState({
    employment: "",
    remote: "",
    date: "",
  });

  // ==============================
  // 🔵 Fetch Profile on Dashboard Load
  // ==============================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getCandidateProfileApi(user.id);
        setCandidateProfile(res);
        localStorage.setItem("candidateProfile", JSON.stringify(res));
      } catch (err) {
        console.log("Profile load error:", err);
      }
    };

    loadProfile();
  }, []);

  // ==============================
  // 🔵 Compute Avatar
  // ==============================
  const profilePhoto = getCandidatePhotoUrl(candidateProfile?.profilePhoto);

  const firstLetter = candidateProfile?.firstName
    ? candidateProfile.firstName.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase();

  // ==============================
  // 🔵 Saved Jobs
  // ==============================
  useEffect(() => {
    const fetchSaved = async () => {
      const res = await getSavedJobsApi(user.id);
      setSavedJobs(res.map((j) => j.id));
    };
    fetchSaved();
  }, []);

  // ==============================
  // 🔵 Applied Jobs
  // ==============================
  useEffect(() => {
    const fetchApplied = async () => {
      const res = await getAppliedJobsApi(user.id);
      setAppliedJobs(res);
    };
    fetchApplied();
  }, []);

  // ==============================
  // 🔵 Search Function
  // ==============================
  const handleSearch = async () => {
    try {
      const res = await searchJobsApi(keyword, location, filters);
      setResults(res);
    } catch (err) {
      console.log("Search error:", err);
    }
  };

  // Auto search on filter changes
  useEffect(() => {
    handleSearch();
  }, [filters]);

  const updateFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  // ==============================
  // 🔴 Logout
  // ==============================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("candidateProfile");
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">

        {/* LEFT SIDEBAR */}
        <div className="w-72 bg-[#082f49] text-white p-8 space-y-10">
          <h1 className="text-2xl font-bold cursor-pointer">
            hotdevjobs<span className="text-orange-500">.com</span>
          </h1>

          <h2 className="text-lg font-bold">FILTER RESULTS</h2>

          {/* Employment Type */}
<div>
  <h3 className="font-semibold mb-2">Employment Type</h3>
  <div className="space-y-2 text-sm">

    <label>
      <input
        type="checkbox"
        checked={filters.employment === "Part-time"}
        onChange={() => updateFilter("employment", "Part-time")}
      />{" "}
      Part-Time
    </label>

    <br />

    <label>
      <input
        type="checkbox"
        checked={filters.employment === "Full-time"}
        onChange={() => updateFilter("employment", "Full-time")}
      />{" "}
      Full-Time
    </label>

  </div>
</div>

{/* Remote */}
<div>
  <h3 className="font-semibold mb-2">Remote</h3>
  <div className="space-y-2 text-sm">

    <label>
      <input
        type="checkbox"
        checked={filters.remote === "Remote"}
        onChange={() => updateFilter("remote", "Remote")}
      />{" "}
      Remote
    </label>

    <br />

    <label>
      <input
        type="checkbox"
        checked={filters.remote === "Office"}
        onChange={() => updateFilter("remote", "Office")}
      />{" "}
      Office
    </label>

    <br />

    <label>
      <input
        type="checkbox"
        checked={filters.remote === "Hybrid"}
        onChange={() => updateFilter("remote", "Hybrid")}
      />{" "}
      Hybrid
    </label>

  </div>
</div>

{/* Date Posted */}
<div>
  <h3 className="font-semibold mb-2">Date Posted</h3>
  <div className="space-y-2 text-sm">

    <label>
      <input
        type="checkbox"
        checked={filters.date === "today"}
        onChange={() => updateFilter("date", "today")}
      />{" "}
      Today
    </label>

    <br />

    <label>
      <input
        type="checkbox"
        checked={filters.date === "last7"}
        onChange={() => updateFilter("date", "last7")}
      />{" "}
      Last 7 Days
    </label>

    <br />

    <label>
      <input
        type="checkbox"
        checked={filters.date === "last30"}
        onChange={() => updateFilter("date", "last30")}
      />{" "}
      Last 30 Days
    </label>

  </div>
</div>

        </div>

        {/* RIGHT MAIN AREA */}
        <div className="flex-1">
          
          {/* NAVBAR */}
          <div className="bg-[#082f49] text-white px-10 py-4 flex justify-between items-center shadow gap-4">

            <div className="flex-1 flex justify-center gap-7 font-medium">
              <Link className="hover:text-orange-400">🔍 Search for Jobs</Link>
              <Link to="/candidate/saved-jobs" className="hover:text-orange-400">
                👁 View Saved Jobs
              </Link>
              <Link to="/candidate/edit-profile" className="hover:text-orange-400">
                ✏ Edit Profile
              </Link>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                {profilePhoto ? (
                  <img src={profilePhoto} className="w-full h-full object-cover" />
                ) : (
                  firstLetter
                )}
              </div>

              <button
                onClick={logout}
                className="bg-red-500 px-4 py-1 rounded"
              >
                Logout
              </button>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-xl shadow">
            <h2 className="text-3xl font-bold mb-6">Candidate Dashboard</h2>

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search Job Title"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 border px-4 py-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Job Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 border px-4 py-3 rounded-lg"
              />

              <button
                onClick={handleSearch}
                className="bg-orange-500 text-white px-6 rounded-lg"
              >
                🔍
              </button>
            </div>
          </div>

          {/* RESULTS SECTION */}
          <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-4">Search Results</h3>

            {results.length === 0 ? (
              <p className="text-gray-500">No jobs found...</p>
            ) : (
              <div className="space-y-4">
                {results.map((job) => (
                  <div
                    key={job.id}
                    className="flex justify-between items-center bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/candidate/job/${job.id}`)}
                  >
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-blue-700">
                        {job.title}
                      </span>

                      {savedJobs.includes(job.id) && (
                        <span className="text-sm text-gray-600">(Saved)</span>
                      )}

                      {appliedJobs.some((a) => a.jobId === job.id) && (
                        <span className="text-sm text-gray-600">
                          (Applied – {appliedJobs.find((a) => a.jobId === job.id)?.status})
                        </span>
                      )}
                    </div>

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

export default CandidateDashboard;
