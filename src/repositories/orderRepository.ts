import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import Cart from "../models/Cart";

export const createOrder = async (userId: number) => {
  const cartItems = await Cart.findAll({ where: { userId } });

  if (cartItems.length === 0) throw new Error("Cart is empty.");

  const totalPrice = cartItems.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);

  const order = await Order.create({ userId, totalPrice });

  const orderItems = cartItems.map((item) => ({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    priceAtPurchase: item.priceAtPurchase,
  }));

  await OrderItem.bulkCreate(orderItems);
  await Cart.destroy({ where: { userId } });

  return order;
};

export const getUserOrders = async (userId: number) => {
  return await Order.findAll({
    where: { userId },
    include: [OrderItem],
  });
};

export const getAllOrders = async () => {
  return await Order.findAll({ include: [OrderItem] });
};
