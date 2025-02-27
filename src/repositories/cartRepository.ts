import Cart from "../models/Cart";
import Product from "../models/Product";

export const addToCart = async (userId: number, productId: number, quantity: number) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("Product not found");

  return await Cart.create({
    userId,
    productId,
    quantity,
    priceAtPurchase: product.price,
  });
};

export const getCartItems = async (userId: number) => {
  return await Cart.findAll({ where: { userId }, include: [Product] });
};

export const removeCartItem = async (userId: number, cartId: number) => {
  return await Cart.destroy({ where: { id: cartId, userId } });
};

export const clearCart = async (userId: number) => {
  return await Cart.destroy({ where: { userId } });
};

export function getUserCart(userId: number) {
    throw new Error("Function not implemented.");
}

export function removeFromCart(userId: number, productId: number) {
    throw new Error("Function not implemented.");
}

export function updateCartItem(userId: number, productId: number, newQuantity: number) {
    throw new Error("Function not implemented.");
}
