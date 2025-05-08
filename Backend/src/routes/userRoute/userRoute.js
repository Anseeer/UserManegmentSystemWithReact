import {login , signup , updateUser , logout ,authCheck } from "../../controllers/userController/authController.js"
import express from 'express';
import {upload} from "../../middleware/upload.js";
import Protected from "../../middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.post('/signup',signup);
userRoute.post('/login',login);
userRoute.get('/logout',Protected,logout);
userRoute.get('/authCheck',Protected,authCheck);
userRoute.post('/updateUser',Protected,upload.single("profileImg"),updateUser);

export default userRoute;