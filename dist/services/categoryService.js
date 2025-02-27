"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategory = exports.modifyCategory = exports.listCategories = exports.addCategory = void 0;
const categoryRepository_1 = require("../repositories/categoryRepository");
const addCategory = async (categoryData) => {
    return await (0, categoryRepository_1.createCategory)(categoryData);
};
exports.addCategory = addCategory;
const listCategories = async () => {
    return await (0, categoryRepository_1.getAllCategories)();
};
exports.listCategories = listCategories;
const modifyCategory = async (id, updateData) => {
    return await (0, categoryRepository_1.updateCategory)(id, updateData);
};
exports.modifyCategory = modifyCategory;
const removeCategory = async (id) => {
    return await (0, categoryRepository_1.deleteCategory)(id);
};
exports.removeCategory = removeCategory;
//# sourceMappingURL=categoryService.js.map