import jwt from "jsonwebtoken";
import User from "../models/userModel/userSchema.js";

const Protected = async (req,res,next)=>{
    let Token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            Token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(Token,process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select('-password');
            next();
        } catch (error) {
           return  res.status(401).json({msg:'Not Authorized , Token Faild'});
        }
    }

    if (!Token) {
        return res.status(401).json({ msg: 'Not authorized, no token' });
      }
}

export default Protected;