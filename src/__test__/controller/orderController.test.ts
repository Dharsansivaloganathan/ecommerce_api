import request from "supertest";
import app from "../../server"; 
import * as orderService from "../../services/orderService";

jest.mock("../../middleware/authMiddleware", () => ({
  authenticateUser: (req: any, res: any, next: any) => {
    req.user = { id: 1 }; 
    next();
  },
}));

describe("Order Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should place an order", async () => {
    const mockOrder:any = { id: 1, userId: 1, totalAmount: 100, status: "Pending" };

    jest.spyOn(orderService, "placeOrder").mockResolvedValue(mockOrder);

    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", "Bearer mockToken");

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockOrder);
  });

  it("should retrieve the user's order history", async () => {
    const mockOrders:any = [
      { id: 1, userId: 1, totalAmount: 100, status: "Pending" },
      { id: 2, userId: 1, totalAmount: 50, status: "Completed" },
    ];

    jest.spyOn(orderService, "getUserOrders").mockResolvedValue(mockOrders);

    const response = await request(app)
      .get("/api/orders")
      .set("Authorization", "Bearer mockToken");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockOrders);
  });
});
