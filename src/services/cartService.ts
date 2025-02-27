import Cart from "../models/Cart";
import Product from "../models/Product";
import { Op } from "sequelize";

export const addToCart = async (userId: number, productId: number, quantity: number) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("Product not found");

  let cartItem = await Cart.findOne({ where: { userId, productId } });

  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    cartItem = await Cart.create({
      userId,
      productId,
      quantity,
      priceAtPurchase: product.price,
    });
  }

  return cartItem;
};

export const getCart = async (userId: number) => {
  return await Cart.findAll({
    where: { userId },
    include: [{ model: Product, attributes: ["name", "price"] }],
  });
};

export const removeFromCart = async (userId: number, productId: number) => {
  const cartItem = await Cart.findOne({ where: { userId, productId } });
  if (!cartItem) throw new Error("Item not found in cart");

  await cartItem.destroy();
};
