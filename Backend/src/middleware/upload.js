// import multer from "multer";
// import cloudinary from "../config/cloudinary-config.js";
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

// const Storage = new CloudinaryStorage({
//     cloudinary:cloudinary,
//     params:{
//         folder:"UserManegmentUsingReact",
//         allowed_formats:["jpg", "jpeg", "png"],
//     },
// });

// const upload = multer({Storage});

// export default upload;

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

export const upload = multer({ storage });
