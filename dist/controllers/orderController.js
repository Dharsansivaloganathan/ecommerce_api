"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.getOrders = exports.createOrder = void 0;
const orderService_1 = require("../services/orderService");
const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const order = await (0, orderService_1.placeOrder)(userId);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await (0, orderService_1.fetchUserOrders)(userId);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getOrders = getOrders;
const getAllOrders = async (req, res) => {
    try {
        const orders = await (0, orderService_1.fetchAllOrders)();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getAllOrders = getAllOrders;
//# sourceMappingURL=orderController.js.map