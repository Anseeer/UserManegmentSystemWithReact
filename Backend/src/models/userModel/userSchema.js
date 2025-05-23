
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    password:{
        type:String,
        require:true
    },

    profileImg:{
        type:String,
        default:''
    },

    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    }
},{timeStamp:true});

const User = mongoose.model('User',userSchema);
export default User;