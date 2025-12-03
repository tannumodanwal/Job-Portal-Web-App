import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../api/authApi";
import Footer from "../auth/Footer";
const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.role || formData.role === "select") {
    alert("⚠ Please select a user role");
    return;
  }

  try {
    const res = await registerApi(formData, formData.role);
    setErrors({});
    navigate("/Login");

  } catch (err) {
    const backendErrors = err.response?.data?.errors;
    if (backendErrors) {
      setErrors(backendErrors);   // ⭐ store backend errors
    } else {
      alert("Registration Failed");
    }
  }
};


  return (
    <>
    <div className="w-full h-screen flex">
      
      {/* LEFT IMAGE SECTION */}
      <div className="w-1/2 h-full relative hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=1000&q=80"
          alt="register banner"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute top-8 left-10 text-3xl font-extrabold text-white">
          hotdevjobs<span className="text-orange-500">.com</span>
        </h1>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center bg-white px-10">
        <h2 className="text-3xl font-semibold mb-10">Create User Account</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-5">
          
          {/* EMAIL */}
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="px-5 py-3 border rounded-md outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="px-5 py-3 border rounded-md outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* ROLE SELECT */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="px-5 py-3 border rounded-md outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="select">Select</option>
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold transition"
          >
            Save
          </button>
        </form>

        {/* Already Account Link */}
        <p className="mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
            <Footer />

    </>
  );
};

export default Register;
