import "./Dashboard.css";
import DashboardNav from "../../Components/Dashboard-nav/DashboardNav";
import DashContent from "../../Components/DashboardContent/DashContent";
import { useState } from "react";

const Dashboard = () => {
  const [profileTab, setProfileTab] = useState<boolean>(false);

  return (
    <div className="home">
      <DashboardNav setProfileTab={setProfileTab} profileTab={profileTab} />
      {/* {profileTab && <Profile />} */}
      <DashContent />
      
    </div>
  );
};

export default Dashboard;
