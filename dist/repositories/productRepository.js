"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.findProductById = exports.getAllProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const createProduct = async (productData) => {
    return await Product_1.default.create(productData);
};
exports.createProduct = createProduct;
const getAllProducts = async () => {
    return await Product_1.default.findAll();
};
exports.getAllProducts = getAllProducts;
const findProductById = async (id) => {
    return await Product_1.default.findByPk(id);
};
exports.findProductById = findProductById;
const updateProduct = async (id, updateData) => {
    await Product_1.default.update(updateData, { where: { id } });
    return (0, exports.findProductById)(id);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    return await Product_1.default.destroy({ where: { id } });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productRepository.js.map