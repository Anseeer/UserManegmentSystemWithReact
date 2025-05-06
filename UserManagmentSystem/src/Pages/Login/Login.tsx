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
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3003/login',form);
      dispatch(login(res.data));
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
          <span className="signup-link">Sign Up</span>
        </p>   
      </div>
    </div>
  );
};

export default Login;
