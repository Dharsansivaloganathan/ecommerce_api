"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.createCategory = void 0;
const categoryService_1 = require("../services/categoryService");
const createCategory = async (req, res) => {
    try {
        const category = await (0, categoryService_1.addCategory)(req.body);
        res.status(201).json(category);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createCategory = createCategory;
const getCategories = async (req, res) => {
    try {
        const categories = await (0, categoryService_1.listCategories)();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getCategories = getCategories;
const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await (0, categoryService_1.modifyCategory)(parseInt(req.params.id), req.body);
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        await (0, categoryService_1.removeCategory)(parseInt(req.params.id));
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map