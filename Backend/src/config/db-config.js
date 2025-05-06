import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully...");
    } catch (error) {
        console.log("Db connection faild !");
        console.error(error);
    }
};


export default connectDB;