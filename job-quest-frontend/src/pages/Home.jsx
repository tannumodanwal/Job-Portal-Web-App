import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import ButtonsSection from "../components/ButtonsSection";
import ProfileSection from "../components/ProfileSection";
import ApplicationsSection from "../components/ApplicationsSection";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isRecruiter = useSelector((state) => state.auth.isRecruiter);

  if (!isAuthenticated) {
    return (
      <div className="pt-40 px-32">
        <HeroSection />
        <ButtonsSection />
      </div>
    );
  }

  if (isRecruiter) {
    return (
      <div className="pt-40 px-32">
       <ProfileSection />

<div className="my-6 flex justify-end">
  <Link
    to="/postjob"
    className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition"
  >
    + Post New Job
  </Link>
</div>



        <ApplicationsSection />
      </div>
    );
  }

  // FOR CANDIDATES
  return (
    <div className="pt-40 px-32">
      <ProfileSection />
      <ApplicationsSection />
    </div>
  );
};

export default Home;
