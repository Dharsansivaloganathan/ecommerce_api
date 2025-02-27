"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyCart = exports.deleteCartItem = exports.fetchCartItems = exports.addProductToCart = void 0;
const cartRepository_1 = require("../repositories/cartRepository");
const addProductToCart = async (userId, productId, quantity) => {
    return await (0, cartRepository_1.addToCart)(userId, productId, quantity);
};
exports.addProductToCart = addProductToCart;
const fetchCartItems = async (userId) => {
    return await (0, cartRepository_1.getCartItems)(userId);
};
exports.fetchCartItems = fetchCartItems;
const deleteCartItem = async (userId, cartId) => {
    return await (0, cartRepository_1.removeCartItem)(userId, cartId);
};
exports.deleteCartItem = deleteCartItem;
const emptyCart = async (userId) => {
    return await (0, cartRepository_1.clearCart)(userId);
};
exports.emptyCart = emptyCart;
//# sourceMappingURL=cartService.js.map