import { Request, Response } from "express";
import { addToCart, getCart, removeFromCart } from "../services/cartService";

export const addProductToCart = async (req: any, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;
    const cartItem = await addToCart(userId, productId, quantity || 1);
    res.status(201).json(cartItem);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const viewCart = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const cartItems = await getCart(userId);
    res.status(200).json(cartItems);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const removeCartItem = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const productId = parseInt(req.params.productId);
    await removeFromCart(userId, productId);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
