import "./Navbar.css";
import profile_icon from "../../assets/profile_icon.png";
import logout_icon from "../../assets/logout_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Slices/userSlice";
import {useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/Store";


interface PropType {
  setProfileTab: React.Dispatch<React.SetStateAction<boolean>>; 
  profileTab: boolean; 
}

const Navbar = ({ setProfileTab, profileTab }: PropType) => {

  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state:RootState)=> state.user.user);
  const isAuthenticated = useSelector((state:RootState)=> state.user.isAuthenticated);
  
  const handleLogout = ()=>{
    dispatch(logout());
    localStorage.clear();
    navigate('/login')
  }

  return (
    <div className="nav">
      <div className="nav-left">
        <h3>Welcome,{isAuthenticated?`${user?.name}`:`Guest`}</h3>
      </div>
      <div className="nav-center">
        <ul>
          {/* <li>Home</li>
          <li>Profile</li> */}
        </ul>
      </div>
      <div className="nav-right">
        <img
          onClick={() => {isAuthenticated?setProfileTab(!profileTab):navigate('/login')}}
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

export default Navbar;
