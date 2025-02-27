"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;
const productService_1 = require("../services/productService");
const createProduct = async (req, res) => {
    try {
        const product = await (0, productService_1.addProduct)(req.body, req.file);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        const products = await (0, productService_1.listProducts)();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getProducts = getProducts;
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await (0, productService_1.modifyProduct)(parseInt(req.params.id), req.body);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        await (0, productService_1.removeProduct)(parseInt(req.params.id));
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map