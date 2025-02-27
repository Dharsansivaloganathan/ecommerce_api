"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllOrders = exports.fetchUserOrders = exports.placeOrder = void 0;
const orderRepository_1 = require("../repositories/orderRepository");
const placeOrder = async (userId) => {
    return await (0, orderRepository_1.createOrder)(userId);
};
exports.placeOrder = placeOrder;
const fetchUserOrders = async (userId) => {
    return await (0, orderRepository_1.getUserOrders)(userId);
};
exports.fetchUserOrders = fetchUserOrders;
const fetchAllOrders = async () => {
    return await (0, orderRepository_1.getAllOrders)();
};
exports.fetchAllOrders = fetchAllOrders;
//# sourceMappingURL=orderService.js.map