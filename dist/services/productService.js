"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProduct = exports.modifyProduct = exports.listProducts = exports.addProduct = void 0;
const productRepository_1 = require("../repositories/productRepository");
const Product_1 = __importDefault(require("../models/Product"));
const addProduct = async (data, file) => {
    const imageUrl = file ? file.path : null; // Store Cloudinary image URL
    const product = await Product_1.default.create({
        ...data,
        imageUrl,
    });
    return product;
};
exports.addProduct = addProduct;
// export const addProduct = async (productData: any) => {
//   return await createProduct(productData);
// };
const listProducts = async () => {
    return await (0, productRepository_1.getAllProducts)();
};
exports.listProducts = listProducts;
const modifyProduct = async (id, updateData) => {
    return await (0, productRepository_1.updateProduct)(id, updateData);
};
exports.modifyProduct = modifyProduct;
const removeProduct = async (id) => {
    return await (0, productRepository_1.deleteProduct)(id);
};
exports.removeProduct = removeProduct;
//# sourceMappingURL=productService.js.map