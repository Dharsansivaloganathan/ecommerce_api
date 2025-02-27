import request from "supertest";
import app from "../../server";
import * as productService from "../../services/productService";

jest.mock("../../services/productService");

const mockProduct = {
  id: 1,
  name: "Test Product",
  description: "A sample product",
  price: 100,
  stock: 10,
  categoryId: 1,
  imageUrl: "http://example.com/image.jpg"
};

describe("Product Controller", () => {
  describe("createProduct", () => {
    it("should create a product successfully", async () => {
      (productService.addProduct as jest.Mock).mockResolvedValue(mockProduct);
      
      const res = await request(app)
        .post("/api/products")
        .send({ name: "Test Product", price: 100, categoryId: 1 });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockProduct);
    });

    it("should return 400 if product creation fails", async () => {
      (productService.addProduct as jest.Mock).mockRejectedValue(new Error("Product creation failed"));
      
      const res = await request(app)
        .post("/api/products")
        .send({ name: "Test Product" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Product creation failed");
    });
  });

  describe("getProducts", () => {
    it("should return all products", async () => {
      (productService.listProducts as jest.Mock).mockResolvedValue([mockProduct]);

      const res = await request(app).get("/api/products");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([mockProduct]);
    });
  });

  describe("updateProduct", () => {
    it("should update a product successfully", async () => {
      (productService.modifyProduct as jest.Mock).mockResolvedValue(mockProduct);
      
      const res = await request(app)
        .put("/api/products/1")
        .send({ name: "Updated Product" });
      
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockProduct);
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product successfully", async () => {
      (productService.removeProduct as jest.Mock).mockResolvedValue(undefined);
      
      const res = await request(app).delete("/api/products/1");
      
      expect(res.status).toBe(204);
    });
  });
});
