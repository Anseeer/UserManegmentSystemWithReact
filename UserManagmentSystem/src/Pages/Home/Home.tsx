import "./Home.css";
import Navbar from "../../Components/Home-nav/Navbar";
import Profile from "../../Components/User-profile/profile";
import { useState } from "react";

const Home = () => {
  const [profileTab, setProfileTab] = useState<boolean>(false);

  return (
    <div className="home">
      <Navbar setProfileTab={setProfileTab} profileTab={profileTab} />
      {profileTab && <Profile />}
    </div>
  );
};

export default Home;
