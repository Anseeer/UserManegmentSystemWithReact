import { signup , login , updateAdmin , getUser } from '../../controllers/adminController/adminController.js';
import express from 'express';
import {upload} from "../../middleware/upload.js";

const adminRoute = express.Router();

adminRoute.post('/signup',signup);
adminRoute.post('/login',login);
adminRoute.post('/updateAdmin',upload.single("profileImg"),updateAdmin);
adminRoute.get('/getUser', (req, res) => {
    console.log("✅ Route /admin/getUser hit");
    getUser(req, res);
  });
  
export default adminRoute;
