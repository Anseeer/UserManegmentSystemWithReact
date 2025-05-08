import User from '../../models/userModel/userSchema.js';
import bcrypt from 'bcrypt';
import GenerateToken from '../../config/jwt-token.js';
function HashPass(pass){
    return  bcrypt.hash(pass, 10);
}

const signup = async (req,res)=>{
   try {
    const {name,email,password} = req.body;
    const existingUser = await User.findOne({email,isAdim:true});
    if(existingUser) res.status(400).json({msg:"admin already exists !"});
    const hashed = await HashPass(password);
    const admin = new User({name,email,password:hashed,isAdmin:true});
    await admin.save();
    const token = GenerateToken(res,admin);
    res.status(200).json({ msg: 'Signup successful',admin,token})
   } catch (error) {
    res.status(500).json({msg:error?.msg});
   }
} 

const login = async (req,res)=>{
    try {
    const {email,password} = req.body;
    const admin = await User.findOne({email,isAdmin:true});
    console.log(admin)
    if (!admin) return res.status(400).json({ msg: 'Admin not  found' });

    const matchPass = await bcrypt.compare(password,admin.password);
    if (!matchPass) return res.status(400).json({ msg: 'Incorrect password' });

    const token = GenerateToken(res,admin);
    return res.json({msg:"Login successfull",token,admin})

    } catch (error) {
        res.status(500).json({msg:error?.message});
    }
} 

const updateAdmin = async(req,res)=>{
    try {
        const {name,email} = req.body;
        const imageURL = req.file?.path;
        console.log("req:",req.admin,req)
        console.log("updated Data",req.body);
        const admin = await User.findOne({email,isAdmin:true});
        if(!admin) return res.json({msg:"User Not Found , Faild To Update"});
        admin.name = name;
        admin.profileImg = imageURL || admin.profileImg;
        await admin.save();
        console.log("user updated return :",admin);
        res.status(200).json({ msg: 'Update successful',admin})
    } catch (error) {
        res.status(500).json({msg:error?.message});
    }
}
const getUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log("id:", userId);

    if (userId) {
      const user = await User.findOne({ _id: userId });
      console.log("get the id:", user);
      return res.status(200).json(user); 
    } else {
      const users = await User.find({ isAdmin: false });
      console.log("find the user");

      if (!users || users.length === 0) {
        return res.status(404).json({ msg: "Users Not Available, Empty!" });
      }

      console.log("GetUser:", users);
      return res.status(200).json(users); 
    }
  } catch (error) {
    res.status(500).json({ msg: error?.message || "Internal Server Error" });
  }
};

const deleteUser = async(req,res)=>{
  try {
    console.log("deleteUser body data:",req.query.userId);
    const userId = req.query.userId;
    await User.deleteOne({_id:userId});
    return res.status(200).json({msg:"Delete Successfully"}); 
  } catch (error) {
    res.status(500).json({ msg: error?.message || "Internal Server Error" });
  }
}

export {login , signup , updateAdmin ,getUser ,deleteUser};  