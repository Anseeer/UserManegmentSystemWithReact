import "./Home.css";
import Profile from "../../Components/User-profile/Profile";
import { useState } from "react";
import Navbar from "../../Components/Home-nav/Navbar";

const Home = () => {
  const [profileTab, setProfileTab] = useState<boolean>(false);

  return (
    <div className="home">
      <Navbar setProfileTab={setProfileTab} profileTab={profileTab} />
      {profileTab && <Profile/>}
    </div>
  );
};

export default Home;
