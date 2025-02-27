import { addToCart, getCart, removeFromCart } from "../../services/cartService";
import Cart from "../../models/Cart";
import Product from "../../models/Product";

jest.mock("../../models/Cart");
jest.mock("../../models/Product");

describe("Cart Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addToCart", () => {
    it("should add a product to the cart", async () => {
      const mockUserId = 1;
      const mockProductId = 10;
      const mockProduct = { id: mockProductId, price: 100, stock: 5 };
      const mockCartItem = { id: 1, userId: mockUserId, productId: mockProductId, quantity: 1, price: 100 };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);
      (Cart.findOne as jest.Mock).mockResolvedValue(null);
      (Cart.create as jest.Mock).mockResolvedValue(mockCartItem);

      const result = await addToCart(mockUserId, mockProductId, 1);

      expect(Product.findByPk).toHaveBeenCalledWith(mockProductId);
      expect(Cart.findOne).toHaveBeenCalledWith({ where: { userId: mockUserId, productId: mockProductId } });
      expect(Cart.create).toHaveBeenCalledWith({ userId: mockUserId, productId: mockProductId, quantity: 1, price: 100 });
      expect(result).toEqual(mockCartItem);
    });

    it("should update quantity if product already exists in the cart", async () => {
      const mockUserId = 1;
      const mockProductId = 10;
      const mockProduct = { id: mockProductId, price: 100, stock: 5 };
      const mockCartItem = { id: 1, userId: mockUserId, productId: mockProductId, quantity: 1, price: 100, update: jest.fn() };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);
      (Cart.findOne as jest.Mock).mockResolvedValue(mockCartItem);

      await addToCart(mockUserId, mockProductId, 2);

      expect(mockCartItem.update).toHaveBeenCalledWith({ quantity: 3 });
    });

    it("should throw an error if product is not found", async () => {
      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(addToCart(1, 10, 1)).rejects.toThrow("Product not found");
    });

    it("should throw an error if requested quantity exceeds stock", async () => {
      const mockProduct = { id: 10, price: 100, stock: 2 };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      await expect(addToCart(1, 10, 3)).rejects.toThrow("Not enough stock available");
    });
  });

  describe("getCart", () => {
    it("should return the user's cart", async () => {
      const mockUserId = 1;
      const mockCartItems = [
        { id: 1, productId: 10, quantity: 2, price: 100, Product: { name: "Laptop" } },
        { id: 2, productId: 20, quantity: 1, price: 50, Product: { name: "Mouse" } },
      ];

      (Cart.findAll as jest.Mock).mockResolvedValue(mockCartItems);

      const result = await getCart(mockUserId);

      expect(Cart.findAll).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        include: [{ model: Product, attributes: ["name", "price"] }],
      });
      expect(result).toEqual(mockCartItems);
    });
  });

  describe("removeFromCart", () => {
    it("should remove a product from the cart", async () => {
      const mockUserId = 1;
      const mockProductId = 10;
      const mockCartItem = { id: 1, destroy: jest.fn() };

      (Cart.findOne as jest.Mock).mockResolvedValue(mockCartItem);

      await removeFromCart(mockUserId, mockProductId);

      expect(Cart.findOne).toHaveBeenCalledWith({ where: { userId: mockUserId, productId: mockProductId } });
      expect(mockCartItem.destroy).toHaveBeenCalled();
    });

    it("should throw an error if product is not in the cart", async () => {
      (Cart.findOne as jest.Mock).mockResolvedValue(null);

      await expect(removeFromCart(1, 10)).rejects.toThrow("Product not found in cart");
    });
  });
});
