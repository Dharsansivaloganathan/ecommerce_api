"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCartItems = exports.removeFromCart = exports.getCart = exports.addToCart = void 0;
const cartService_1 = require("../services/cartService");
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // Assuming authentication middleware is used
        const cartItem = await (0, cartService_1.addProductToCart)(userId, productId, quantity);
        res.status(201).json(cartItem);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.addToCart = addToCart;
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartItems = await (0, cartService_1.fetchCartItems)(userId);
        res.status(200).json(cartItems);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getCart = getCart;
const removeFromCart = async (req, res) => {
    try {
        const cartId = parseInt(req.params.id);
        const userId = req.user.id;
        await (0, cartService_1.deleteCartItem)(userId, cartId);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.removeFromCart = removeFromCart;
const clearCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        await (0, cartService_1.emptyCart)(userId);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.clearCartItems = clearCartItems;
//# sourceMappingURL=cartController.js.map