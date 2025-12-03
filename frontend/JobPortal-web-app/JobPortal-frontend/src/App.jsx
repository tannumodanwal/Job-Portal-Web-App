import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home
import HomePage from "./pages/home/HomePage";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Footer from "./pages/auth/Footer";

// Candidate
import CandidateDashboard from "./candidate/CandidateDashboard";
import CandidateEditProfile from "./candidate/CandidateEditProfile";
import JobDetailsCandidate from "./candidate/JobDetailsCandidate";
import SavedJobs from "./candidate/SavedJobs";
// import AppliedJobs from "./pages/candidate/AppliedJobs";

// Recruiter 
import RecruiterDashboard from "./recruiter/RecruiterDashboard";
import PostJob from "./recruiter/PostJob";
import EditJob from "./recruiter/EditJobDetails";
import ViewJobs from "./recruiter/ViewJobs";
import EditRecruiterProfile from "./recruiter/EditRecruiterProfile";
import JobDetailsRecruiter from "./recruiter/JobDetailsRecruiter";
import CandidatesList from "./recruiter/CandidatesList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/footer" element={<Footer />} />

        {/* Candidate */}
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/candidate/edit-profile" element={<CandidateEditProfile />} />
        <Route path="/candidate/job/:jobId" element={<JobDetailsCandidate />} />
        <Route path="/candidate/saved-jobs" element={<SavedJobs />} />
        {/* <Route path="/candidate/applied-jobs" element={<AppliedJobs />} />  */}

        {/* Recruiter */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />
        <Route path="/recruiter/view-jobs" element={<ViewJobs />} />
        <Route path="/recruiter/edit-profile" element={<EditRecruiterProfile />} />
        <Route path="/recruiter/job/:jobId" element={<JobDetailsRecruiter />} />
        <Route path="/recruiter/edit-job/:jobId" element={<EditJob />} />
        <Route path="/recruiter/candidates/:jobId" element={<CandidatesList />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
