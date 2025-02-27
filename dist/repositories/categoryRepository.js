"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.findCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const createCategory = async (categoryData) => {
    return await Category_1.default.create(categoryData);
};
exports.createCategory = createCategory;
const getAllCategories = async () => {
    return await Category_1.default.findAll();
};
exports.getAllCategories = getAllCategories;
const findCategoryById = async (id) => {
    return await Category_1.default.findByPk(id);
};
exports.findCategoryById = findCategoryById;
const updateCategory = async (id, updateData) => {
    await Category_1.default.update(updateData, { where: { id } });
    return (0, exports.findCategoryById)(id);
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    return await Category_1.default.destroy({ where: { id } });
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryRepository.js.map