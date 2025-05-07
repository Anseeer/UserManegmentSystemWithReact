import { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Signup = ()=> {
   const[form,setForm] = useState({name:'',email:'',password:''});
  const navigate = useNavigate();
  const HandleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault();

    try {
      console.log(form);
      await axios.post('http://localhost:3003/signup',form);   
      navigate('/login')
    } catch (error:any) {
      toast.error(error.response.data.msg || "Signup failed")
    }
  }
  
  return (
    <div className="SignupWrapper">
      <div className="SignupCard">
        <h2>Sign Up</h2>
        <form onSubmit={HandleSubmit } className="SignupForm" >
          <input name="name" value={form.name} onChange={(e)=> setForm({...form,name:e.target.value})} type="text" placeholder="Enter your name" />
          <input name="email" value={form.email} onChange={(e)=> setForm({...form,email:e.target.value})}  type="email" placeholder="Email (example@gmail.com)" />
          <input name="password" value={form.password} onChange={(e)=> setForm({...form,password:e.target.value})}  type="password" placeholder="Enter password" />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <span onClick={()=> navigate("/login") }  className="login-link">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
