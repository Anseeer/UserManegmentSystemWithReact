import { signup , login , updateAdmin , getUser ,deleteUser } from '../../controllers/adminController/adminController.js';
import express from 'express';
import {upload} from "../../middleware/upload.js";
import Protected from '../../middleware/authMiddleware.js';
const adminRoute = express.Router();

adminRoute.post('/signup',signup);
adminRoute.post('/login',login);
adminRoute.get('/deleteUser',deleteUser);
adminRoute.post('/updateAdmin',upload.single("profileImg"),updateAdmin);
adminRoute.get('/getUser',getUser);

  
export default adminRoute;
