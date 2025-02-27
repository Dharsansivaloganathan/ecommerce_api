import Cart from "../../models/Cart";
import * as cartRepository from "../../repositories/cartRepository";

jest.mock("../../models/Cart", () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
}));

describe("Cart Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all cart items for a user", async () => {
    const userId = 1;
    const mockCartItems = [{ id: 1, productId: 2, quantity: 3 }];
    (Cart.findAll as jest.Mock).mockResolvedValue(mockCartItems);

    const result = await cartRepository.getUserCart(userId);
    expect(result).toEqual(mockCartItems);
    expect(Cart.findAll).toHaveBeenCalledWith({ where: { userId } });
  });

  it("should add a product to the cart", async () => {
    const cartData = { userId: 1, productId: 2, quantity: 1 };
    const createdCartItem = { id: 1, ...cartData };

    (Cart.create as jest.Mock).mockResolvedValue(createdCartItem);

    const result = await cartRepository.addToCart(1,2,1);
    expect(result).toEqual(createdCartItem);
    expect(Cart.create).toHaveBeenCalledWith(cartData);
  });

  it("should remove a product from the cart", async () => {
    const userId = 1;
    const productId = 2;
    (Cart.destroy as jest.Mock).mockResolvedValue(1);

    const result = await cartRepository.removeFromCart(userId, productId);
    expect(result).toEqual(1);
    expect(Cart.destroy).toHaveBeenCalledWith({ where: { userId, productId } });
  });

  it("should update the quantity of a product in the cart", async () => {
    const userId = 1;
    const productId = 2;
    const newQuantity = 5;

    (Cart.update as jest.Mock).mockResolvedValue([1]);

    const result = await cartRepository.updateCartItem(userId, productId, newQuantity);
    expect(result).toEqual([1]);
    expect(Cart.update).toHaveBeenCalledWith(
      { quantity: newQuantity },
      { where: { userId, productId } }
    );
  });
});
