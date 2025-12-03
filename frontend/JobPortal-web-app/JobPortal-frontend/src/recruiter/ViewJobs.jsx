import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobsByRecruiterApi, deleteJobApi } from "../api/jobApi";
import { getRecruiterPhotoUrl } from "../api/recruiterApi";
import { Link } from "react-router-dom";
import Footer from "../pages/auth/Footer";

const ViewJobs = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [jobs, setJobs] = useState([]);

  const profilePhoto = getRecruiterPhotoUrl(user?.profilePhoto);
  const firstLetter = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : user?.email.charAt(0).toUpperCase();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getJobsByRecruiterApi(userId);
        setJobs(res);
      } catch (err) {
        console.log("Error", err);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJobApi(id);
      alert("Job Deleted!");
      setJobs(jobs.filter((job) => job.id !== id)); // remove from screen
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100">

      {/* HEADER BAR */}
      <div className="bg-[#082f49] text-white px-10 py-4 shadow flex justify-between">
        <h1 className="text-3xl font-extrabold">hotdevjobs<span className="text-orange-500">.com</span></h1>
        <button onClick={() => navigate("/recruiter/dashboard")} className="text-sm underline">
          Back to Search Results
        </button>
      </div>
      {/* MAIN SECTION */}
      <div className="max-w-5xl mx-auto mt-10 bg-white p-10 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-6">Your Posted Jobs</h2>

        {jobs.length === 0 ? (
          <p className="text-gray-500">You haven't posted any jobs yet.</p>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-50 border rounded-xl px-6 py-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
              >
                <div>
                  <h3
                    onClick={() => navigate(`/recruiter/job/${job.id}`)}
                    className="text-xl font-semibold text-blue-700 cursor-pointer"
                  >
                    {job.title}
                  </h3>
                  <p className="text-gray-600">
                    {job.city}, {job.state}
                  </p>
                  <p className="text-gray-700 font-medium">{job.companyName}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/recruiter/edit-job/${job.id}`)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ViewJobs;
