import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db-config.js';
import userRoute from './routes/userRoute/userRoute.js';
import adminRoute from './routes/adminRoute/adminRoute.js';
import cookieParser from 'cookie-parser';


connectDB();

dotenv.config();

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());

app.use('/',userRoute);
app.use('/admin',adminRoute);

app.listen(process.env.PORT,()=>{
    console.log(` Server is listing in the port :${process.env.PORT}`);
});
 