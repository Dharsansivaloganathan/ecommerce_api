import request from "supertest";
import app from "../../server";
import Category from "../../models/Category";

jest.mock("../../models/Category");

describe("Category Controller Tests", () => {
  let adminToken: string;

  beforeAll(async () => {
    adminToken = "abc";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new category", async () => {
    const mockCategory = { id: 1, name: "Electronics", description: "Tech products" };
    (Category.create as jest.Mock).mockResolvedValue(mockCategory);

    const res = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Electronics", description: "Tech products" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockCategory);
  });

  test("should get all categories", async () => {
    const mockCategories = [
      { id: 1, name: "Electronics", description: "Tech products" },
      { id: 2, name: "Clothing", description: "Fashion items" },
    ];
    (Category.findAll as jest.Mock).mockResolvedValue(mockCategories);

    const res = await request(app).get("/api/categories");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockCategories);
  });

  test("should update a category", async () => {
    const mockCategory = { id: 1, name: "Updated Electronics", description: "Updated description" };
    (Category.findByPk as jest.Mock).mockResolvedValue({ update: jest.fn().mockResolvedValue(mockCategory) });

    const res = await request(app)
      .put("/api/categories/1")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Updated Electronics", description: "Updated description" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockCategory);
  });

  test("should delete a category", async () => {
    (Category.findByPk as jest.Mock).mockResolvedValue({ destroy: jest.fn().mockResolvedValue({}) });

    const res = await request(app)
      .delete("/api/categories/1")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(204);
  });
});
