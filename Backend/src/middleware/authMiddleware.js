import jwt from "jsonwebtoken";
import User from "../models/userModel/userSchema.js";

const Protected = async (req, res, next) => {
    const token = req.cookies['user-management-jwt'] 
  
    if (!token) {
      return res.status(401).json({ msg: 'Not authorized, no token' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({_id:decoded.userId}).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ msg: 'Not Authorized, token failed' });
    }
  };
  
export default Protected;
