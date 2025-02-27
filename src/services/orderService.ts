import Order from "../models/Order";
import Cart from "../models/Cart";
import Product from "../models/Product";
import { Op } from "sequelize";

// Place an order - Stores cart items with persistent pricing
export const placeOrder = async (userId: number) => {
  const cartItems = await Cart.findAll({ where: { userId }, include: [Product] });

  if (!cartItems.length) {
    throw new Error("Cart is empty");
  }

  // Store product price at purchase time
  const orderItems = cartItems.map(item => ({
    userId,
    productId: item.productId,
    quantity: item.quantity,
    priceAtPurchase: item.priceAtPurchase,
    status: "Pending",
  }));

  const order = await Order.bulkCreate(orderItems);

  // Clear cart after placing an order
  await Cart.destroy({ where: { userId } });

  return order;
};

// Get customer orders
export const getUserOrders = async (userId: number) => {
  return await Order.findAll({ where: { userId }, include: [Product] });
};

// Admin: Get all orders
export const getAllOrders = async () => {
  return await Order.findAll({ include: [Product] });
};

// Cancel an order (only if it's still pending)
export const cancelUserOrder = async (userId: number, orderId: number) => {
  const order = await Order.findOne({ where: { id: orderId, userId, status: "Pending" } });

  if (!order) {
    throw new Error("Order not found or cannot be canceled");
  }

  await order.destroy();
};

// Admin: Update order status
export const updateOrderStatus = async (orderId: number, status: string) => {
  const order = await Order.findByPk(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  order.status = status;
  await order.save();
  return order;
};
