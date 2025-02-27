import Order from "../../models/Order";
import * as orderRepository from "../../repositories/orderRepository";

jest.mock("../../models/Order", () => ({
  findAll: jest.fn(),
  create: jest.fn(),
}));

describe("Order Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all orders for a user", async () => {
    const userId = 1;
    const mockOrders = [{ id: 1, userId, total: 100.0 }];
    (Order.findAll as jest.Mock).mockResolvedValue(mockOrders);

    const result = await orderRepository.getUserOrders(userId);
    expect(result).toEqual(mockOrders);
    expect(Order.findAll).toHaveBeenCalledWith({ where: { userId } });
  });

  it("should create a new order", async () => {
    const orderData = { userId: 1, total: 150.0 };
    const createdOrder = { id: 1, ...orderData };

    (Order.create as jest.Mock).mockResolvedValue(createdOrder);

    const result = await orderRepository.createOrder(1);
    expect(result).toEqual(createdOrder);
    expect(Order.create).toHaveBeenCalledWith(orderData);
  });
});
