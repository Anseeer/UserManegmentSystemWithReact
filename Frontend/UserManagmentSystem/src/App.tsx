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
const App = ()=>{
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/admin" element={<Dashboard/>}/>
      <Route path="/adminLogin" element={<AdminLogin/>}/>
      <Route path="/adminSignup" element={<AdminSignup/>}/>
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App;