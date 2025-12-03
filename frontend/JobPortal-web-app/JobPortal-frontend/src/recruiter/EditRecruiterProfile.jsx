import React, { useState, useEffect } from "react";
import {
  updateRecruiterProfileApi,
  uploadRecruiterPhotoApi,
  getRecruiterProfileApi,
} from "../api/recruiterApi";
import { useNavigate } from "react-router-dom";
import Footer from "../pages/auth/Footer";

const EditRecruiterProfile = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    country: "",
    company: "",
    profilePhoto: null,
  });

  // PREFILL
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("recruiterProfile"));
    if (storedProfile) {
      setFormData({
        firstName: storedProfile.firstName || "",
        lastName: storedProfile.lastName || "",
        city: storedProfile.city || "",
        state: storedProfile.state || "",
        country: storedProfile.country || "",
        company: storedProfile.company || "",
        profilePhoto: null,
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // ⭐ FRONTEND VALIDATION
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.company.trim()) newErrors.company = "Company name is required";

    // Agar frontend error → stop submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.id;

      const oldProfile = JSON.parse(localStorage.getItem("recruiterProfile"));

      const textData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        company: formData.company,
      };

      // Update text fields
      await updateRecruiterProfileApi(userId, textData);

      // Upload new photo if selected
      if (formData.profilePhoto) {
        await uploadRecruiterPhotoApi(userId, formData.profilePhoto);
      }

      // Fetch updated profile
      const updatedProfile = await getRecruiterProfileApi(userId);

      // Keep old photo if user didn't choose new
      if (!formData.profilePhoto) {
        updatedProfile.profilePhoto = oldProfile?.profilePhoto;
      }

      localStorage.setItem(
        "recruiterProfile",
        JSON.stringify(updatedProfile)
      );

      navigate("/recruiter/dashboard");
    } catch (err) {
      const apiError = err.response?.data;

      if (apiError?.errors) {
        setErrors(apiError.errors);
        return;
      }
      if (apiError?.error) {
        setErrors({ global: apiError.error });
        return;
      }

      setErrors({ global: "Something went wrong" });
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
        <div className="w-full md:w-1/2 flex flex-col justify-center px-12 py-8">
          <h1 className="text-4xl font-bold mb-2 text-center">Recruiter</h1>
          <p className="text-xl text-gray-500 mb-10 text-center">
            Set up your Profile
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg mx-auto w-full">
            
            {/* FIRST + LAST NAME */}
            <div className="flex gap-4">
              <div className="w-1/2 flex flex-col">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border px-4 py-3 rounded-md"
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
                  onChange={handleChange}
                  className="border px-4 py-3 rounded-md"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* CITY + STATE + COUNTRY */}
            <div className="flex gap-4">
              <div className="w-1/3 flex flex-col">
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

              <div className="w-1/3 flex flex-col">
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

              <div className="w-1/3 flex flex-col">
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

            {/* COMPANY */}
            <div className="flex flex-col">
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="border px-4 py-3 rounded-md"
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>

            {/* PHOTO */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-600 mb-1">
                Profile Photo
              </label>

              <div className="border rounded-md px-4 py-2 bg-white w-full flex items-center gap-4 cursor-pointer">
                <label
                  htmlFor="profilePhotoInput"
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
                id="profilePhotoInput"
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

export default EditRecruiterProfile;
