import { signup , login , updateAdmin , getUser ,deleteUser } from '../../controllers/adminController/adminController.js';
import express from 'express';
import {upload} from "../../middleware/upload.js";
import Protected from '../../middleware/authMiddleware.js';
const adminRoute = express.Router();

adminRoute.post('/signup',signup);
adminRoute.post('/login',login);
adminRoute.get('/deleteUser',Protected,deleteUser);
adminRoute.post('/updateAdmin',Protected,upload.single("profileImg"),updateAdmin);
adminRoute.get('/getUser',Protected,getUser);

  
export default adminRoute;
