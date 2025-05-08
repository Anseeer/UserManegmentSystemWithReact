import "./Dashboard.css";
import DashboardNav from "../../Components/Dashboard-nav/DashboardNav";
import DashContent from "../../Components/DashboardContent/DashContent";
import { RootState } from "../../Redux/Store";
import { useState } from "react";
import Profile from "../../Components/Admin-profile/Profile";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [profileTab, setProfileTab] = useState<boolean>(false);
  const admin = useSelector((state:RootState)=> state.admin.isAuthenticated)

  return (
    <div className="home">
      <DashboardNav setProfileTab={setProfileTab} profileTab={profileTab} />
      {profileTab && <Profile/>}
      {!profileTab && admin && <DashContent />}
      
    </div>
  );
};

export default Dashboard;
