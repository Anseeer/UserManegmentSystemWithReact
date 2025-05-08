import { FaUser, FaEnvelope, FaCamera   , FaSyncAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { RootState } from "../../Redux/Store";
import { getProfileImage } from "../../Utilities/profileImg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../../Redux/Slices/userSlice";
import axios from "axios";

const Profile = ()=>{
  const user = useSelector((state:RootState)=> state.user.user);
  const[userData,setuserData] = useState({name:"",email:"",profileImg:""});
  const[selectedFile,setSelectedFile] = useState<File|null>(null);
  const dispatch = useDispatch();
  const profile = getProfileImage(user?.name||"",user?.profileImg);
  
  useEffect(() => {
    if (user) {
      setuserData({
        name: user.name,
        email: user.email,
        profileImg: user.profileImg || "",
      });
    }
    
  }, [user]);

  console.log("profile",profile);
  console.log("profileImg",user?.profileImg);

  const handleChange =async ()=>{

    try {
      const formData = new FormData();
      formData.append("name",userData.name)
      formData.append("email",userData.email)
      if (selectedFile) {
        formData.append("profileImg", selectedFile); 
      }
      const res = await axios.post('http://localhost:3003/updateUser',formData,{
        headers: {
          "Content-Type": "multipart/form-data", 
        },
        withCredentials: true, 
      })
        console.log("res",res)
      dispatch(updateUser(res.data.user));
      toast.success("Profile updated!");
    } catch (error:any) {
      toast.error(error?.response.data.msg || "Faild To Update");
    }
  }

  return user ? (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image-wrapper">
          <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : profile}
            alt="Profile"
            className="profile-img"
          />
          <label htmlFor="profile-upload" className="edit-icon">
            <FaCamera />
          </label>
          <input
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
              }
            }}
            type="file"
            id="profile-upload"
            accept="image/*"
            hidden
          />
        </div>
  
        <div className="profile-info">
          <label>
            <FaUser style={{ marginRight: "8px" }} />
            Username:
            <input
              value={userData?.name}
              onChange={(e) => setuserData({ ...userData, name: e.target.value })}
              type="text"
            />
          </label>
          <label>
            <FaEnvelope style={{ marginRight: "8px" }} />
            Email:
            <label>{user?.email}</label>
          </label>
          <button onClick={handleChange}>
            Change <FaSyncAlt style={{ marginRight: "8px" }} />
          </button>
        </div>
      </div>
    </div>
  ) : null;
  
};

export default Profile;
