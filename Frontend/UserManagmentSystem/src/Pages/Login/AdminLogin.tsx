import React, { useState } from "react";
import "./AdminLogin.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../Redux/Slices/adminSlice";
import { toast } from "react-toastify";
const AdminLogin = () => { 

  const[form,setForm] = useState({email:'',password:''});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleLogin =async (e:React.FormEvent)=>{
    e.preventDefault();
    const { email, password } = form;
    console.log("HandleLogin")
    if (!email || !password) {
      return toast.warn("Please fill in all fields.");
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.warn("Please enter a valid email address.");
    }
  
    if (password.length < 6) {
      return toast.warn("Password must be at least 6 characters long.");
    }

    try {
      const res = await axios.post('http://localhost:3003/admin/login',form,{
        withCredentials:true,
      });
      console.log("res:",res.data)
      dispatch(login(res.data));
      localStorage.setItem("admin",JSON.stringify(res.data.admin));
      toast.success('Logged in successfully');
      navigate('/admin');
    } catch (error:any) {
      console.log("err",error.response.data.msg)
      toast.error(error.response.data.msg || "Login failed")
    }
  }

  return (
    <div className="SigninWrapper">
      <div className="SigninCard">
        <h2> ADMIN : Sign In</h2>
        <form onSubmit={HandleLogin} className="SigninForm">
          <input value={form.email} onChange={(e)=> setForm({...form,email:e.target.value})} type="email" placeholder="Email (example@gmail.com)" />
          <input value={form.password} onChange={(e)=> setForm({...form,password:e.target.value})} type="password" placeholder="Enter your password" />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <span onClick={()=> navigate("/adminSignup") } className="signup-link">Sign Up</span>
        </p>   
      </div>
    </div>
  );
};

export default AdminLogin;
