import "./DashboardNav.css";
import profile_icon from "../../assets/profile_icon.png";
import logout_icon from "../../assets/logout_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Slices/adminSlice";
import {useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/Store";


interface PropType {
  setProfileTab: React.Dispatch<React.SetStateAction<boolean>>; 
  profileTab: boolean; 
}

const DashboardNav = ({ setProfileTab, profileTab }: PropType) => {

  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state:RootState)=> state.admin.admin);
  const isAuthenticated = useSelector((state:RootState)=> state.admin.isAuthenticated);
  
  const handleLogout = ()=>{
    dispatch(logout());
    localStorage.clear();
    navigate('/adminLogin');
  }

  return (
    <div className="nav">
      <div className="nav-left">
        <h3>Welcome,{isAuthenticated?`${admin?.name}`:`Admin`}</h3>
      </div>
      <div className="nav-center">
        <ul>
          {/* <li>Home</li>
          <li>Profile</li> */}
        </ul>
      </div>
      <div className="nav-right">
        <img
          onClick={() => {isAuthenticated?setProfileTab(!profileTab):navigate('/adminLogin')}}
          src={profile_icon}
          alt="profile_icon"
          style={{ cursor: "pointer" }}
        />
        <img 
        onClick={handleLogout}
        src={logout_icon} 
        alt="logout_icon"
        />
      </div>
    </div>
  );
};

export default DashboardNav;
