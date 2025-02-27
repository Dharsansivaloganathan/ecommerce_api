import request from "supertest";
import app from "../../server";
import * as authService from "../../services/authService";

jest.mock("../../services/authService");

describe("Auth Controller", () => {
  describe("POST /api/auth/signup", () => {
    it("should register a new user and return 201", async () => {
      const mockUser = { id: 1, email: "test@example.com", role: "customer" };
      (authService.registerUser as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).post("/api/auth/signup").send({
        email: "test@example.com",
        password: "password123",
        role: "customer"
      });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockUser);
    });

    it("should return 400 if signup fails", async () => {
      (authService.registerUser as jest.Mock).mockRejectedValue(new Error("Signup failed"));

      const res = await request(app).post("/api/auth/signup").send({
        email: "test@example.com",
        password: "password123",
        role: "customer"
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Signup failed");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should log in a user and return token", async () => {
      const mockToken = { token: "mock-jwt-token" };
      (authService.loginUser as jest.Mock).mockResolvedValue(mockToken);

      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123"
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockToken);
    });

    it("should return 401 for invalid credentials", async () => {
      (authService.loginUser as jest.Mock).mockRejectedValue(new Error("Invalid credentials"));

      const res = await request(app).post("/api/auth/login").send({
        email: "wrong@example.com",
        password: "wrongpassword"
      });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error", "Invalid credentials");
    });
  });
});
