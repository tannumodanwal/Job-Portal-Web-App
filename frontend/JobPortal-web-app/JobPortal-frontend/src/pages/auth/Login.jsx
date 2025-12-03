import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/authApi";
import { getRecruiterProfileApi } from "../../api/recruiterApi";

import Footer from "../auth/Footer";
const Login = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
      setErrors({}); // clear old errors


  try {
    const res = await loginApi(email, password);

    // store basic user info
    localStorage.setItem("token", res.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: res.id,
        email: res.email,
        role: res.role,
      })
    );

    // ⭐ fetch recruiter profile after login ⭐
     if (res.role === "recruiter") {
  try {
    const profile = await getRecruiterProfileApi(res.id);
    localStorage.setItem("recruiterProfile", JSON.stringify(profile));
    navigate("/recruiter/dashboard");
  } catch (err) {
    console.log("No recruiter profile found, redirecting to setup page...");
    navigate("/recruiter/dashboard");   // user profile banayega
  }
}

    else if (res.role === "candidate") {
  try {
    const profile = await getCandidateProfileApi(res.id);
    localStorage.setItem("candidateProfile", JSON.stringify(profile));
    navigate("/candidate/dashboard");
  } catch(err) {
    console.log("No candidate profile found, redirecting to setup...");
    navigate("/candidate/dashboard");
  }
}


 } catch (err) {
  const apiError = err.response?.data;

  // Backend sending: { error: "Invalid password" }
  if (apiError?.error) {
    setErrors({ password: apiError.error });
    return;
  }

  // Backend sending: { errors: { email:"...", password:"..." } }
  if (apiError?.errors) {
    setErrors(apiError.errors);
    return;
  }

  alert("Login Failed");
}



  
};

 

  return (
    <>
    <div className="flex h-screen">
      {/* Left Image UI */}
      <div
        className="w-1/2 bg-cover bg-center"
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

      {/* Right Login Form */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <form onSubmit={handleLogin} className="w-3/4 max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Login
          </h2>
           {/* 🔴 Error Box (GLOBAL) */}
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                {errors.email || errors.password}
              </div>
            )}
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full border px-4 py-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full border px-4 py-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition"
          >
            Log in
          </button>

          <p className="text-center mt-4 text-gray-600">
            Are you a new User?{" "}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Register Now
            </Link>
          </p>
        </form>
        
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
