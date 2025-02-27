import { placeOrder, getUserOrders } from "../../services/orderService";
import Order from "../../models/Order";
import Cart from "../../models/Cart";
import Product from "../../models/Product";
import OrderItem from "../../models/OrderItem";

jest.mock("../../models/Order");
jest.mock("../../models/Cart");
jest.mock("../../models/Product");
jest.mock("../../models/OrderItem");

describe("Order Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("placeOrder", () => {
    it("should successfully place an order", async () => {
      const mockUserId = 1;
      const mockCartItems = [
        { id: 1, productId: 10, quantity: 2, price: 100, destroy: jest.fn() },
        { id: 2, productId: 20, quantity: 1, price: 50, destroy: jest.fn() },
      ];
      const mockOrder = { id: 1, userId: mockUserId, totalAmount: 250 };
      const mockOrderItems = [
        { orderId: 1, productId: 10, quantity: 2, price: 100 },
        { orderId: 1, productId: 20, quantity: 1, price: 50 },
      ];

      (Cart.findAll as jest.Mock).mockResolvedValue(mockCartItems);
      (Order.create as jest.Mock).mockResolvedValue(mockOrder);
      (OrderItem.bulkCreate as jest.Mock).mockResolvedValue(mockOrderItems);

      const result = await placeOrder(mockUserId);

      expect(Cart.findAll).toHaveBeenCalledWith({ where: { userId: mockUserId } });
      expect(Order.create).toHaveBeenCalledWith({ userId: mockUserId, totalAmount: 250 });
      expect(OrderItem.bulkCreate).toHaveBeenCalledWith(mockOrderItems);
      expect(mockCartItems[0].destroy).toHaveBeenCalled();
      expect(mockCartItems[1].destroy).toHaveBeenCalled();
      expect(result).toEqual(mockOrder);
    });

    it("should throw an error if the cart is empty", async () => {
      (Cart.findAll as jest.Mock).mockResolvedValue([]);

      await expect(placeOrder(1)).rejects.toThrow("Cart is empty");
    });
  });

  describe("getUserOrders", () => {
    it("should return the user's order history", async () => {
      const mockUserId = 1;
      const mockOrders = [
        {
          id: 1,
          totalAmount: 250,
          OrderItems: [
            { productId: 10, quantity: 2, price: 100, Product: { name: "Laptop" } },
            { productId: 20, quantity: 1, price: 50, Product: { name: "Mouse" } },
          ],
        },
      ];

      (Order.findAll as jest.Mock).mockResolvedValue(mockOrders);

      const result = await getUserOrders(mockUserId);

      expect(Order.findAll).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        include: [
          {
            model: OrderItem,
            include: [{ model: Product, attributes: ["name", "price"] }],
          },
        ],
      });
      expect(result).toEqual(mockOrders);
    });

    it("should return an empty array if no orders exist", async () => {
      (Order.findAll as jest.Mock).mockResolvedValue([]);

      const result = await getUserOrders(1);

      expect(result).toEqual([]);
    });
  });
});
