import request from "supertest";
import app from "../../server";
import sequelize from "../../config/database";

describe("Auth Service Tests", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  let token: string;

  test("User Signup - Should create a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      email: "testuser@example.com",
      password: "password123",
      role: "customer"
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  test("User Login - Should authenticate and return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123"
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("User Login - Invalid credentials should return error", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "wrong@example.com",
      password: "wrongpass"
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});
