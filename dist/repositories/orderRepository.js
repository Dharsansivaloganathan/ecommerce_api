"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.getUserOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const OrderItem_1 = __importDefault(require("../models/OrderItem"));
const Cart_1 = __importDefault(require("../models/Cart"));
const createOrder = async (userId) => {
    const cartItems = await Cart_1.default.findAll({ where: { userId } });
    if (cartItems.length === 0)
        throw new Error("Cart is empty.");
    const totalPrice = cartItems.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);
    const order = await Order_1.default.create({ userId, totalPrice });
    const orderItems = cartItems.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
    }));
    await OrderItem_1.default.bulkCreate(orderItems);
    await Cart_1.default.destroy({ where: { userId } }); // Clear cart after order placement
    return order;
};
exports.createOrder = createOrder;
const getUserOrders = async (userId) => {
    return await Order_1.default.findAll({
        where: { userId },
        include: [OrderItem_1.default],
    });
};
exports.getUserOrders = getUserOrders;
const getAllOrders = async () => {
    return await Order_1.default.findAll({ include: [OrderItem_1.default] });
};
exports.getAllOrders = getAllOrders;
//# sourceMappingURL=orderRepository.js.map