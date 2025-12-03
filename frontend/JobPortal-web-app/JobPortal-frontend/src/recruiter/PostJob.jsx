import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Footer from "../pages/auth/Footer";
import { postJobApi } from "../api/jobApi";

const PostJob = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDescription = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // clear old errors

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const recruiterId = user?.id;

      if (!recruiterId) {
        alert("Recruiter not logged in!");
        return;
      }

      const jobPayload = { ...formData };

      await postJobApi(recruiterId, jobPayload);

      navigate("/recruiter/dashboard");

      // Reset form
      setFormData({
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

    } catch (err) {
      const apiError = err.response?.data;

      // ⭐ Backend: { errors : { fieldName : "message" } }
      if (apiError?.errors) {
        setErrors(apiError.errors);
        return;
      }

      // ⭐ Backend: { message: "error message" }
      if (apiError?.message) {
        setErrors({ global: apiError.message });
        return;
      }

      setErrors({ global: "Something went wrong" });
    }
  };

  return (
    <>
      <div className="flex h-screen">
        
        {/* LEFT IMAGE */}
        <div
          className="w-1/2 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=60')",
          }}
        >
          <div className="p-8">
            <h1 className="text-4xl font-extrabold text-white">
              hotdevjobs<span className="text-orange-500">.com</span>
            </h1>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 px-12 py-8 overflow-y-auto">

          <h1 className="text-4xl font-bold mb-2 text-center">Post New Job</h1>

          {/* GLOBAL ERROR */}
          {errors.global && (
            <p className="text-red-500 text-center mb-4">{errors.global}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">

            {/* Job Title */}
            <div className="flex flex-col">
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={formData.title}
                onChange={handleChange}
                className="border px-4 py-3 rounded-md"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* JobType - RemoteType - Salary */}
            <div className="grid grid-cols-3 gap-4">

              <div className="flex flex-col">
                <input
                  type="text"
                  name="jobType"
                  placeholder="Job Type"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="border px-4 py-3 rounded-md"
                />
                {errors.jobType && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="remoteType"
                  placeholder="Remote Type"
                  value={formData.remoteType}
                  onChange={handleChange}
                  className="border px-4 py-3 rounded-md"
                />
                {errors.remoteType && (
                  <p className="text-red-500 text-sm mt-1">{errors.remoteType}</p>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="salary"
                  placeholder="Salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="border px-4 py-3 rounded-md"
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                )}
              </div>

            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Description</label>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={handleDescription}
                className="bg-white"
                style={{ height: "150px", marginBottom: "40px" }}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Posted Date */}
            <div className="flex flex-col">
              <input
                type="text"
                name="postedDate"
                placeholder="Posted Date"
                value={formData.postedDate}
                onChange={handleChange}
                className="border px-4 py-3 rounded-md"
              />
              {errors.postedDate && (
                <p className="text-red-500 text-sm mt-1">{errors.postedDate}</p>
              )}
            </div>

            {/* Location */}
            <div className="grid grid-cols-3 gap-4">
              
              <div className="flex flex-col">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="border px-4 py-3 rounded-md"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="border px-4 py-3 rounded-md"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border px-4 py-3 rounded-md"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>

            </div>

            {/* Company Name */}
            <div className="flex flex-col">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="border px-4 py-3 rounded-md"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
              )}
            </div>

            {/* Save */}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              Save
            </button>

          </form>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default PostJob;
