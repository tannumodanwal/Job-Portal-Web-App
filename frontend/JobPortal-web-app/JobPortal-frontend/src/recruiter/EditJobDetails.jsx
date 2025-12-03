import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobDetailsApi, updateJobApi } from "../api/jobApi";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Footer from "../pages/auth/Footer";
const EditJob = () => {
    const { jobId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    jobType: "",
    remoteType: "",
    salary: "",
    description: "",
    postedDate: "",
    city: "",
    state: "",
    country: "",
    companyName: "", 
  });

  useEffect(() => {
    const loadJob = async () => {
      const job = await getJobDetailsApi(jobId);

      setFormData({
        title: job.title,
        jobType: job.jobType,
        remoteType: job.remoteType,
        salary: job.salary,
        description: job.description,
        postedDate: job.postedDate,
        city: job.city,
        state: job.state,
        country: job.country,
        companyName: job.companyName,
      });
    };
    loadJob();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDescription = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateJobApi(jobId, formData);
      alert("Job Updated Successfully!");
      navigate(`/recruiter/job/${jobId}`);
    } catch (err) {
      console.log(err);
      alert("Update Failed!");
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

      <div className="max-w-4xl mx-auto mt-10 bg-white p-10 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-5">Edit Job</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
          />

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="jobType"
              placeholder="Job Type"
              value={formData.jobType}
              onChange={handleChange}
              className="border px-4 py-3 rounded-md"
            />

            <input
              type="text"
              name="remoteType"
              placeholder="Remote Type"
              value={formData.remoteType}
              onChange={handleChange}
              className="border px-4 py-3 rounded-md"
            />
 
            <input
              type="text"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleChange}
              className="border px-4 py-3 rounded-md"
            />
          </div>

          <ReactQuill
            value={formData.description}
            onChange={handleDescription}
            className="bg-white"
            style={{ height: "150px", marginBottom: "40px" }}
          />

         <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="postedDate"
              placeholder="Posted Date"
              value={formData.postedDate}
              onChange={handleChange}
              className="border px-4 py-3 rounded-md"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border px-4 py-3 rounded-md"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border px-4 py-3 rounded-md"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="border px-4 py-3 rounded-md"
            />
          </div>

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
          />

          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold w-full mt-5">
            Update Job
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default EditJob;
