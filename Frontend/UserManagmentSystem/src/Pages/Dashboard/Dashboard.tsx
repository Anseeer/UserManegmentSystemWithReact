import "./Dashboard.css";
import DashboardNav from "../../Components/Dashboard-nav/DashboardNav";
import DashContent from "../../Components/DashboardContent/DashContent";
import { useState } from "react";
import Profile from "../../Components/Admin-profile/Profile";

const Dashboard = () => {
  const [profileTab, setProfileTab] = useState<boolean>(false);

  return (
    <div className="home">
      <DashboardNav setProfileTab={setProfileTab} profileTab={profileTab} />
      {profileTab && <Profile/>}
      {!profileTab && <DashContent />}
      
    </div>
  );
};

export default Dashboard;
