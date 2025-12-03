import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicationsForJobApi,
  acceptApplicationApi,
  rejectApplicationApi,
} from "../api/jobApi";
import Footer from "../pages/auth/Footer";

const CandidatesList = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    const res = await getApplicationsForJobApi(jobId);
    console.log("Applications API response ===>", res);

    const data = Array.isArray(res) ? res : res.data || [];
    setApplications(data);
  };

  const handleAccept = async (appId) => {
    await acceptApplicationApi(appId);
    fetchApplications();
  };

  const handleReject = async (appId) => {
    await rejectApplicationApi(appId);
    fetchApplications();
  };

  // Status based lists
  const pending = applications.filter((app) => app.status === "PENDING");
  const accepted = applications.filter((app) => app.status === "ACCEPTED");
  const rejected = applications.filter((app) => app.status === "REJECTED");

  // ========================== CARD COMPONENT ==========================
 const ApplicationCard = ({ app, showButtons }) => {
  return (
    <div
      className={`flex p-6 rounded-xl border mb-6 shadow 
        ${
          app.status === "ACCEPTED"
            ? "border-green-600 bg-[#0f172a]"
            : app.status === "REJECTED"
            ? "border-red-600 bg-[#0f172a]"
            : "border-gray-700 bg-[#0f172a]"
        }`}
    >
      {/* LEFT SECTION */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">{app.firstName || "Not Provided"}</h2>
          <h2 className="text-xl font-bold">{app.lastName || "Not Provided"}</h2>
        </div>

        <p className="mt-4 text-gray-300">{app.email || "Not Provided"}</p>
        <p className="text-gray-300">{app.phoneNumber || "Not Provided"}</p>
        <p className="text-gray-300">{app.qualification || "Not Provided"}</p>
        {/* SKILLS */}
        <div className="flex flex-wrap gap-2 mt-4">
          {app.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-700 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Resume */}
        <a
  href={app.candidateResumeLink}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-400 underline block mt-4"
>
  Resume
</a>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-48 flex flex-col justify-center items-center border-l border-gray-700 pl-6 gap-4">
        {showButtons ? (
          <>
            <button
              onClick={() => handleAccept(app.id)}
              className="bg-green-600 hover:bg-green-700 w-32 py-3 rounded-lg font-semibold"
            >
              Accept ✓
            </button>

            <button
              onClick={() => handleReject(app.id)}
              className="bg-red-600 hover:bg-red-700 w-32 py-3 rounded-lg font-semibold"
            >
              Reject ✗
            </button>
          </>
        ) : (
          <span
            className={`text-lg font-bold ${
              app.status === "ACCEPTED" ? "text-green-400" : "text-red-400"
            }`}
          >
            {app.status === "ACCEPTED" ? "Accepted" : "Rejected"}
          </span>
        )}
      </div>
    </div>
  );
};
  // ========================== END CARD COMPONENT ==========================

  return (
    <>
      <div className="min-h-screen bg-[#020617] text-white p-10">

        {/* Pending */}
        <h1 className="text-3xl font-bold mb-4">Pending Applications</h1>
        {pending.length === 0 ? (
          <p>No pending applications.</p>
        ) : (
          pending.map((app) => (
            <ApplicationCard key={app.id} app={app} showButtons={true} />
          ))
        )}

        {/* Accepted */}
        <h1 className="text-3xl font-bold mt-12 mb-4">Accepted Applications</h1>
        {accepted.length === 0 ? (
          <p>No accepted applications yet.</p>
        ) : (
          accepted.map((app) => (
            <ApplicationCard key={app.id} app={app} showButtons={false} />
          ))
        )}

        {/* Rejected */}
        <h1 className="text-3xl font-bold mt-12 mb-4">Rejected Applications</h1>
        {rejected.length === 0 ? (
          <p>No rejected applications yet.</p>
        ) : (
          rejected.map((app) => (
            <ApplicationCard key={app.id} app={app} showButtons={false} />
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default CandidatesList;
