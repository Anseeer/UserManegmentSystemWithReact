import { signup , login , updateAdmin } from '../../controllers/adminController/adminController.js';
import express from 'express';
import {upload} from "../../middleware/upload.js";

const adminRoute = express.Router();

adminRoute.post('/signup',signup);
adminRoute.post('/login',login);
adminRoute.post('/updateAdmin',upload.single("profileImg"),updateAdmin);

export default adminRoute;
