import jwt from "jsonwebtoken";

const GenerateToken = (res,user)=>{

    const payload = {
        user:{
            id:user._id,
            role:user.isAdmin?'admin':'user',
        }
    }

    const Token =  jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'15m'});

    res.cookie("user-management-jwt", Token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      });

      return Token;
};

export default GenerateToken;