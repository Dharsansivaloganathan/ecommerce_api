import { Request, Response } from "express";
import { placeOrder, getUserOrders, getAllOrders, cancelUserOrder, updateOrderStatus } from "../services/orderService";

export const createOrder = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const order = await placeOrder(userId);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Customers get their own orders, Admins get all orders
export const getOrders = async (req: any, res: Response) => {
  try {
    const orders = req.user?.role === "admin" ? await getAllOrders() : await getUserOrders(req.user?.id);
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Cancel order (Customers only)
export const cancelOrder = async (req: any, res: Response) => {
  try {
    await cancelUserOrder(req.user?.id, parseInt(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Admin updates order status
export const updateOrder = async (req: any, res: Response) => {
  try {
    const updatedOrder = await updateOrderStatus(parseInt(req.params.id), req.body.status);
    res.status(200).json(updatedOrder);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
