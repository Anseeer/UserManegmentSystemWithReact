import jwt from "jsonwebtoken";

const GenerateToken = (res,userId)=>{

    const Token =  jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'15m'});

    res.cookie("user-management-jwt", Token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      });
      console.log("Cookie",res.cookies)

      return Token;
};

export default GenerateToken;