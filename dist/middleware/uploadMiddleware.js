"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
// Configure storage to upload files to Cloudinary
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: async (req, file) => ({
        folder: "ecommerce_products", // Folder name in Cloudinary
        format: file.mimetype.split("/")[1], // Extract file format from mimetype
    }),
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
//# sourceMappingURL=uploadMiddleware.js.map