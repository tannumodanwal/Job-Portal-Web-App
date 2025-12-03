import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Footer from "../auth/Footer";

const HomePage = () => {
  const location = useLocation();

  const [active, setActive] = useState(
    location.pathname.includes("recruiter")
      ? "recruiter"
      : location.pathname.includes("candidate")
      ? "candidate"
      : ""
  );

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <>
      {/* Background Section */}
      <div
        className="h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=1770&q=80')",
        }}
      >
        {/* Top Navbar */}
        <div className="w-full flex justify-between items-center gap-1 px-10 py-5 bg-black bg-opacity-40">
          <h1 className="text-3xl font-extrabold text-white cursor-pointer">
            hotdevjobs<span className="text-orange-500">.com</span>
          </h1>

          {/* Buttons */}
          <div className="flex gap-4">
            {/* Candidate Buttons */}
            <div className="px-5 py-2 rounded-md font-medium bg-orange-500 text-white flex gap-1">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-blue-300 underline hover:text-blue-400" : ""
                }
                onClick={() => setActive("candidate")}
              >
                Job Candidate Login
              </NavLink>

              <span>/</span>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-blue-300 underline hover:text-blue-400" : ""
                }
                onClick={() => setActive("candidate")}
              >
                Register
              </NavLink>
            </div>

            {/* Recruiter Buttons */}
            <div className="px-5 py-2 rounded-md font-medium bg-blue-700 text-white flex gap-1 hover:text-blue-400">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-blue-300 underline" : ""
                }
                onClick={() => setActive("candidate")}
              >
                Recruiter Login
              </NavLink>

              <span>/</span>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-blue-300 underline" : ""
                }
                onClick={() => setActive("candidate")}
              >
                Register
              </NavLink>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center items-center mt-32 px-5">
          <div className="w-4/5 bg-white shadow-xl rounded-full flex overflow-hidden">
            <input
              type="text"
              placeholder="Search for a Job"
              className="flex-1 px-6 py-4 outline-none text-gray-700"
            />

            <input
              type="text"
              placeholder="Enter a location"
              className="flex-1 px-6 py-4 outline-none text-gray-700 border-l"
            />

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 flex items-center justify-center">
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </>
  );
};

export default HomePage;
