import {login , signup , updateUser} from "../../controllers/userController/authController.js"
import express from 'express';
import {upload} from "../../middleware/upload.js";

const userRoute = express.Router();

userRoute.post('/signup',signup);
userRoute.post('/login',login);
userRoute.post('/updateUser',upload.single("profileImg"),updateUser);

export default userRoute;
