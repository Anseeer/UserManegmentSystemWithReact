import "./App.css"
import Signup from "./Pages/Signup/Signup";
import AdminSignup from "./Pages/Signup/AdminSignup";
import Login from "./Pages/Login/Login";
import AdminLogin from "./Pages/Login/AdminLogin";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Routes , Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Redux/Store";
import { Navigate } from "react-router-dom";
import { setUser } from "./Redux/Slices/userSlice";
import { setAdmin } from "./Redux/Slices/adminSlice";
import axios from "axios";
import { useEffect } from "react";


const App = ()=>{
  const admin = useSelector((state:RootState)=> state.admin.admin);
  const user = useSelector((state:RootState)=> state.user.user);
  const dispatch = useDispatch();
  const authCheck = async()=>{
    try {
      const res  =  await axios.get('http://localhost:3003/authCheck',{withCredentials:true});
      const admin =res.data.user.isAdmin;
      console.log("AuthChechk:",res.data.user)
      console.log("AuthChechk-admin:",admin)
      admin? dispatch(setAdmin(res.data.user)):dispatch(setUser(res.data.user));
    } catch (error) {
console.error(error.response.data.msg || error)  
  }
  }

  useEffect(()=>{
    authCheck()
  },[]);
  console.log("ADMIN",admin);
  return (
    <>
    <Routes>
      <Route path="/" element={user?<Home/>:<Navigate to="/login" replace/>}/>
      <Route path="/login" element={user? <Navigate to="/" replace/>:<Login/>}/>
      <Route path="/signup" element={user? <Navigate to="/" replace/>:<Signup/>}/>
      <Route path="/admin" element={admin?<Dashboard/>:<Navigate to="/adminLogin" replace />}/>
      <Route path="/adminLogin" element={ admin?<Navigate to="/admin" replace />:<AdminLogin/>}/>
      <Route path="/adminSignup" element={admin?<Navigate to="/admin" replace />:<AdminSignup/>}/>
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App;