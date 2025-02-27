import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "ecommerce_products", 
    format: file.mimetype.split("/")[1],
  }),
});

const upload = multer({ storage });

export default upload;
