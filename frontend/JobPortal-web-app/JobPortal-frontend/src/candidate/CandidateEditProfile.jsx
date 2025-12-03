import React, { useState } from "react";
import { useEffect } from "react";
import { updateCandidateProfileApi, uploadCandidatePhotoApi, getCandidatePhotoUrl,getCandidateProfileApi } from "../api/candidateApi";
import { useNavigate } from "react-router-dom";
import Footer from "../pages/auth/Footer";

const CandidateEditProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
    qualification: "",
    workAuthorization: "",
    seekingEmployment: "", 
    profilePhoto: null,
    resumeLink: "",
  });

  const [skills, setSkills] = useState([
    { skillName: "", yearOfExperience: "", experienceLevel: "" },
  ]);


  // =====================
// PREFILL FORM ON LOAD
// =====================
useEffect(() => {
  const storedProfile = JSON.parse(localStorage.getItem("candidateProfile"));

  if (storedProfile) {
    setFormData({
      firstName: storedProfile.firstName || "",
      lastName: storedProfile.lastName || "",
      city: storedProfile.city || "",
      state: storedProfile.state || "",
      country: storedProfile.country || "",
      phoneNumber: storedProfile.phoneNumber || "",
      qualification: storedProfile.qualification || "",
      workAuthorization: storedProfile.workAuthorization || "",
      seekingEmployment: storedProfile.seekingEmployment || "",
      profilePhoto: null,
      resumeLink: storedProfile.resumeLink || "",
    });

    // ⭐ Convert JSON arrays to skills list
    const names = JSON.parse(storedProfile.skillName || "[]");
    const years = JSON.parse(storedProfile.yearOfExperience || "[]");
    const levels = JSON.parse(storedProfile.experienceLevel || "[]");

    const loadedSkills = names.map((name, i) => ({
      skillName: name || "",
      yearOfExperience: years[i] || "",
      experienceLevel: levels[i] || "",
    }));

    // Agar koi skill nahi to ek empty row show karo
    setSkills(loadedSkills.length > 0 ? loadedSkills : [
      { skillName: "", yearOfExperience: "", experienceLevel: "" }
    ]);
  }
}, []);


  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };
  
  // Handle Skill Change
  const handleSkillChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  // Add Skill
  const addSkill = () => {
    setSkills([
      ...skills,
      { skillName: "", yearOfExperience: "", experienceLevel: "" },
    ]);
  };

  // Remove Skill
  const removeSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  // Handle Submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  let newErrors = {};

  // FRONTEND VALIDATION FOR SKILLS
  if (!skills[0].skillName.trim()) {
    newErrors.skillName = "Skill name is required";
  }
  if (!skills[0].yearOfExperience.trim()) {
    newErrors.yearOfExperience = "Years of experience is required";
  }
  if (!skills[0].experienceLevel.trim()) {
    newErrors.experienceLevel = "Experience level is required";
  }

  // 🔥 RETURN MAT LAGAO
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
  }

  try {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const oldProfile = JSON.parse(localStorage.getItem("candidateProfile"));

    const skillNames = skills.map(s => s.skillName);
    const years = skills.map(s => s.yearOfExperience);
    const levels = skills.map(s => s.experienceLevel);

    const textData = {
      ...formData,
      skillName: JSON.stringify(skillNames),
      yearOfExperience: JSON.stringify(years),
      experienceLevel: JSON.stringify(levels),
      profilePhoto: oldProfile?.profilePhoto || null,
      resumeLink: formData.resumeLink || oldProfile?.resumeLink || null,
    };

    await updateCandidateProfileApi(userId, textData);

    if (formData.profilePhoto) {
      await uploadCandidatePhotoApi(userId, formData.profilePhoto);
    }

    const updatedProfile = await getCandidateProfileApi(userId);

    if (!formData.profilePhoto) {
      updatedProfile.profilePhoto = oldProfile?.profilePhoto;
    }

    localStorage.setItem("candidateProfile", JSON.stringify(updatedProfile));

    navigate("/candidate/dashboard");
  }

  catch (err) {
    const apiError = err.response?.data;

    if (apiError?.errors) {
      setErrors(prev => ({ ...prev, ...apiError.errors }));
      return;
    }

    if (apiError?.error) {
      setErrors(prev => ({ ...prev, global: apiError.error }));
      return;
    }

    setErrors(prev => ({ ...prev, global: "Something went wrong" }));
  }
};

return (
  <>
<div className="flex min-h-screen">

      {/* LEFT IMAGE */}
      <div
        className="w-1/2 bg-cover bg-center hidden md:flex min-h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=60')",
        }}
      >
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-white cursor-pointer">
            hotdevjobs<span className="text-orange-500">.com</span>
          </h1>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-start px-12 py-8">

        <h1 className="text-4xl font-bold mb-2 text-center">Candidate</h1>
        <p className="text-xl text-gray-500 mb-10 text-center">
          Set up your Profile
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl mx-auto">

          {/* NAME */}
          <div className="flex gap-4">
            <div className="w-1/2 flex flex-col">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                className="border px-4 py-3 rounded-md"
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="w-1/2 flex flex-col">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                className="border px-4 py-3 rounded-md"
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* CITY / STATE / COUNTRY */}
          <div className="flex gap-4">
            <div className="w-1/3 flex flex-col">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                className="border px-4 py-3 rounded-md"
                onChange={handleChange}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div className="w-1/3 flex flex-col">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                className="border px-4 py-3 rounded-md"
                onChange={handleChange}
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>

            <div className="w-1/3 flex flex-col">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                className="border px-4 py-3 rounded-md"
                onChange={handleChange}
              />
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>
          </div>

          {/* PHONE + QUALIFICATION */}
          <div className="flex gap-4">
            <div className="w-1/2 flex flex-col">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                className="border px-4 py-3 rounded-md"
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="w-1/2 flex flex-col">
              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={formData.qualification}
                className="border px-4 py-3 rounded-md"
                onChange={handleChange}
              />
              {errors.qualification && (
                <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>
              )}
            </div>
          </div>

          {/* WORK AUTH + SEEKING */}
          <div className="flex gap-4">
            <div className="w-1/2 flex flex-col">
              <input
                type="text"
                name="workAuthorization"
                placeholder="Work Authorization"
                value={formData.workAuthorization}
                className="border px-4 py-3 rounded-md"
                onChange={handleChange}
              />
              {errors.workAuthorization && (
                <p className="text-red-500 text-sm mt-1">{errors.workAuthorization}</p>
              )}
            </div>

            <div className="w-1/2 flex flex-col">
              <input
                type="text"
                name="seekingEmployment"
                placeholder="Seeking Employment"
                value={formData.seekingEmployment}
                className="border px-4 py-3 rounded-md"
                onChange={handleChange}
              />
              {errors.seekingEmployment && (
                <p className="text-red-500 text-sm mt-1">{errors.seekingEmployment}</p>
              )}
            </div>
          </div>

          {/* SKILLS */}
          {/* SKILLS */}
<label className="font-semibold mt-2 text-lg">Skills</label>

{skills.map((skill, index) => (
  <div key={index} className="flex flex-col gap-3">

    {/* Skill Row */}
    <div className="flex gap-4 items-start">

      {/* Skill Name */}
      <div className="w-1/3 flex flex-col">
        <input
          type="text"
          placeholder="Skill Name"
          className="border px-4 py-3 rounded-md"
          value={skill.skillName}
          onChange={(e) =>
            handleSkillChange(index, "skillName", e.target.value)
          }
        />
        {index === 0 && errors.skillName && (
          <p className="text-red-500 text-sm mt-1">{errors.skillName}</p>
        )}
      </div>

      {/* Years */}
      <div className="w-1/3 flex flex-col">
        <input
          type="number"
          placeholder="Years"
          className="border px-4 py-3 rounded-md"
          value={skill.yearOfExperience}
          onChange={(e) =>
            handleSkillChange(index, "yearOfExperience", e.target.value)
          }
        />
        {index === 0 && errors.yearOfExperience && (
          <p className="text-red-500 text-sm mt-1">{errors.yearOfExperience}</p>
        )}
      </div>

      {/* Experience Level */}
      <div className="w-1/3 flex flex-col">
        <select
          className="border px-4 py-3 rounded-md"
          value={skill.experienceLevel}
          onChange={(e) =>
            handleSkillChange(index, "experienceLevel", e.target.value)
          }
        >
          <option value="">Select Experience Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {index === 0 && errors.experienceLevel && (
          <p className="text-red-500 text-sm mt-1">
            {errors.experienceLevel}
          </p>
        )}
      </div>

      {/* Delete Button */}
      {skills.length > 1 && (
        <button
          type="button"
          onClick={() => removeSkill(index)}
          className="text-red-500 text-xl font-bold"
        >
          ✕
        </button>
      )}
    </div>
  </div>
))}


          {/* ADD SKILL */}
          <button
            type="button"
            onClick={addSkill}
            className="bg-gray-200 px-4 py-2 rounded-md w-32"
          >
            + Add Skill
          </button>

          {/* RESUME LINK */}
          <div className="flex flex-col">
            <input
              type="text"
              name="resumeLink"
              placeholder="Resume Link"
              value={formData.resumeLink}
              className="border px-4 py-3 rounded-md"
              onChange={handleChange}
            />
            {errors.resumeLink && (
              <p className="text-red-500 text-sm mt-1">{errors.resumeLink}</p>
            )}
          </div>

          {/* FILE UPLOAD */}
          <div className="flex flex-col mt-2">
            <label className="font-medium text-gray-600 mb-1">
              Profile Photo
            </label>

            <div className="border rounded-md px-4 py-2 bg-white flex items-center gap-4 cursor-pointer">
              <label
                htmlFor="candidateProfilePhoto"
                className="bg-gray-100 border rounded-md px-3 py-1 cursor-pointer"
              >
                Choose file
              </label>

              <span className="text-gray-500 text-sm">
                {formData.profilePhoto ? formData.profilePhoto.name : "No file chosen"}
              </span>
            </div>

            <input
              type="file"
              id="candidateProfilePhoto"
              name="profilePhoto"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            className="bg-orange-500 text-white py-3 rounded-lg mt-4"
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

export default CandidateEditProfile;
