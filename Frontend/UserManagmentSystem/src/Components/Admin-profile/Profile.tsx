import { FaUser, FaEnvelope, FaCamera   , FaSyncAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { AppDispatch, RootState } from "../../Redux/Store";
import { getProfileImage } from "../../Utilities/profileImg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../../Redux/Slices/adminSlice";
import axios from "axios";

const Profile = ()=>{
  const admin = useSelector((state:RootState)=> state.admin.admin);
  const[adminData,setadminData] = useState({name:"",email:"",profileImg:""});
  const[selectedFile,setSelectedFile] = useState<File|null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const profile = getProfileImage(admin?.name||"",admin?.profileImg);
  
  
  useEffect(() => {
    if (admin) {
      setadminData({
        name: admin.name,
        email: admin.email,
        profileImg: admin.profileImg || "",
      });
    }    
  }, [admin]);


  console.log("profile",profile);
  console.log("profileImg",admin?.profileImg);

  const handleChange =async ()=>{

    try {
      const formData = new FormData();
      formData.append("name",adminData.name)
      formData.append("email",adminData.email)
      if (selectedFile) {
        formData.append("profileImg", selectedFile); 
      }
      const res = await axios.post('http://localhost:3003/admin/updateAdmin',formData,{
        headers: {
          "Content-Type": "multipart/form-data", 
        },
        withCredentials:true,
      })
        console.log("res",res)
      dispatch(updateUser(res.data.admin));
      toast.success("Profile updated!");
    } catch (error:any) {
      toast.error(error?.response.data.msg || "Faild To Update");
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image-wrapper">
          <img  src={ selectedFile? URL.createObjectURL(selectedFile):profile}
           alt="Profile"
           className="profile-img"
           />
          <label htmlFor="profile-upload" className="edit-icon">
            <FaCamera   />
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
            Admin:
            <input value={adminData?.name} onChange={(e)=> setadminData({...adminData,name:e.target.value})} type="text"  />
          </label>
          <label>
            <FaEnvelope style={{ marginRight: "8px" }} />
            Email:
            <label>{admin?.email}</label>
          </label>
          <button onClick={handleChange} >Change <FaSyncAlt style={{ marginRight: "8px" }}/></button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

