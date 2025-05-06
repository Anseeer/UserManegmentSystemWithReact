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
    const user = new User({name,email,password:hashed,isAdmin:true});
    await user.save();
    res.status(200).json({ msg: 'Signup successful' })
   } catch (error) {
    res.status(500).json({msg:error?.message});
   }
} 

const login = async (req,res)=>{
    try {
    const {email,password} = req.body;
    const user = await User.findOne({email,isAdmin:true});
    console.log(user)
    if (!user) return res.status(400).json({ msg: 'Admin not  found' });

    const matchPass = await bcrypt.compare(password,user.password);
    if (!matchPass) return res.status(400).json({ msg: 'Incorrect password' });

    const token = GenerateToken(user._id);
    return res.json({msg:"Login successfull",token,user})

    } catch (error) {
        res.status(500).json({msg:error?.message});
    }
} 

const updateAdmin = async(req,res)=>{
    try {
        const {name,email} = req.body;
        const imageURL = req.file?.path;
        console.log("req:",req.user,req)
        console.log("updated Data",req.body);
        const user = await User.findOne({email,isAdmin:true});
        if(!user) return res.json({msg:"User Not Found , Faild To Update"});
        user.name = name;
        user.profileImg = imageURL || user.profileImg;
        await user.save();
        console.log("user updated return :",user);
        res.status(200).json({ msg: 'Update successful',user})
    } catch (error) {
        res.status(500).json({msg:error?.message});
    }
}

export {login , signup , updateAdmin}; 