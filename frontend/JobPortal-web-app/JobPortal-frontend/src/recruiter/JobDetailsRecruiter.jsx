import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobDetailsApi, deleteJobApi} from "../api/jobApi";
import Footer from "../pages/auth/Footer";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await getJobDetailsApi(jobId);
      setJob(res);
    }; 
    fetchJob();
  }, [jobId]);
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJobApi(jobId);
      alert("Job deleted successfully!");
      navigate("/recruiter/dashboard");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete job!");
    }
  };
  if (!job) return <div className="text-center p-10">Loading...</div>;

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

      {/* MAIN JOB DETAILS BOX */}
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


        <div className="flex gap-4 mt-10">
           <button
  className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold"
  onClick={() => navigate(`/recruiter/edit-job/${job.id}`)}
>
  Edit Job
</button>


          <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold" 
            onClick={handleDelete}>
            Delete Job
          </button>

       <button
  className="bg-[#082f49] text-white px-6 py-3 rounded-lg font-semibold ml-auto flex flex-col items-start"
  onClick={() => navigate(`/recruiter/candidates/${job.id}`)}
>
  <span className="text-base font-semibold">
    Candidates Applied
  </span>

  <span className="text-sm text-gray-200">
    ({job.appliedCount} Candidate{job.appliedCount !== 1 ? "s" : ""} Applied)
  </span>

</button>

        </div>
      </div>
    </div>
          <Footer />

    </>
  );
};

export default JobDetails;
