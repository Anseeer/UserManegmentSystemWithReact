import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../Redux/Slices/userSlice";
import { toast } from "react-toastify";
const Login = () => { 

  const[form,setForm] = useState({email:'',password:''});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleLogin =async (e:React.FormEvent)=>{

    const { email, password } = form;

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

    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3003/login',form,{
        withCredentials: true,
      });
      console.log("Res:",res.data)
      dispatch(login(res.data));
      localStorage.setItem("user",JSON.stringify(res.data));
      navigate('/');
    } catch (error:any) {
      console.log("err",error.response.data.msg)
      toast.error(error.response.data.msg || "Login failed")
    }
  }

  return (
    <div className="SigninWrapper">
      <div className="SigninCard">
        <h2>Sign In</h2>
        <form onSubmit={HandleLogin} className="SigninForm">
          <input value={form.email} onChange={(e)=> setForm({...form,email:e.target.value})} type="email" placeholder="Email (example@gmail.com)" />
          <input value={form.password} onChange={(e)=> setForm({...form,password:e.target.value})} type="password" placeholder="Enter your password" />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <span onClick={()=> navigate("/signup") } className="signup-link">Sign Up</span>
        </p>   
      </div>
    </div>
  );
};

export default Login;
