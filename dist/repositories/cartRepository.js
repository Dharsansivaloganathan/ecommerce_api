"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeCartItem = exports.getCartItems = exports.addToCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
const addToCart = async (userId, productId, quantity) => {
    const product = await Product_1.default.findByPk(productId);
    if (!product)
        throw new Error("Product not found");
    // Store the price at the time of adding to the cart
    return await Cart_1.default.create({
        userId,
        productId,
        quantity,
        priceAtPurchase: product.price,
    });
};
exports.addToCart = addToCart;
const getCartItems = async (userId) => {
    return await Cart_1.default.findAll({ where: { userId }, include: [Product_1.default] });
};
exports.getCartItems = getCartItems;
const removeCartItem = async (userId, cartId) => {
    return await Cart_1.default.destroy({ where: { id: cartId, userId } });
};
exports.removeCartItem = removeCartItem;
const clearCart = async (userId) => {
    return await Cart_1.default.destroy({ where: { userId } });
};
exports.clearCart = clearCart;
//# sourceMappingURL=cartRepository.js.map