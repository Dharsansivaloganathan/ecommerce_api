import { addProduct, listProducts, modifyProduct, removeProduct } from "../../services/productService";
import Product from "../../models/Product";
import cloudinary from "../../config/cloudinary";

jest.mock("../../models/Product");
jest.mock("../../models/Category");
jest.mock("../../config/cloudinary");

describe("Product Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addProduct", () => {
    it("should add a new product with an image", async () => {
      const mockProductData = {
        name: "Test Product",
        description: "Test Description",
        price: 100,
        stock: 10,
        categoryId: 1,
      };

      const mockFile = {
        path: "test/path/to/image.jpg",
      } as Express.Multer.File;

      cloudinary.uploader.upload = jest.fn().mockResolvedValue({
        secure_url: "https://cloudinary.com/test-image.jpg",
      });

      (Product.create as jest.Mock).mockResolvedValue({
        id: 1,
        ...mockProductData,
        imageUrl: "https://cloudinary.com/test-image.jpg",
      });

      const result = await addProduct(mockProductData, mockFile);

      expect(cloudinary.uploader.upload).toHaveBeenCalledWith("test/path/to/image.jpg");
      expect(Product.create).toHaveBeenCalledWith({
        ...mockProductData,
        imageUrl: "https://cloudinary.com/test-image.jpg",
      });
      expect(result).toEqual({
        id: 1,
        ...mockProductData,
        imageUrl: "https://cloudinary.com/test-image.jpg",
      });
    });

    it("should throw an error if required fields are missing", async () => {
      await expect(addProduct({})).rejects.toThrow("Missing required fields");
    });
  });

  describe("listProducts", () => {
    it("should return a list of products", async () => {
      const mockProducts = [
        { id: 1, name: "Product 1", price: 100, categoryId: 1 },
        { id: 2, name: "Product 2", price: 200, categoryId: 2 },
      ];

      (Product.findAll as jest.Mock).mockResolvedValue(mockProducts);

      const result = await listProducts(0);

      expect(Product.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });

  describe("modifyProduct", () => {
    it("should update a product", async () => {
      const mockProduct = {
        id: 1,
        name: "Old Product",
        price: 100,
        update: jest.fn().mockResolvedValue(true),
      };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      const updatedData = { name: "Updated Product", price: 150 };

      const result = await modifyProduct(1, updatedData);

      expect(Product.findByPk).toHaveBeenCalledWith(1);
      expect(mockProduct.update).toHaveBeenCalledWith(updatedData);
      expect(result).toEqual(mockProduct);
    });

    it("should throw an error if product is not found", async () => {
      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(modifyProduct(1, { name: "New Name" })).rejects.toThrow("Product not found");
    });
  });

  describe("removeProduct", () => {
    it("should delete a product", async () => {
      const mockProduct = {
        id: 1,
        destroy: jest.fn().mockResolvedValue(true),
      };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      await removeProduct(1);

      expect(Product.findByPk).toHaveBeenCalledWith(1);
      expect(mockProduct.destroy).toHaveBeenCalled();
    });

    it("should throw an error if product is not found", async () => {
      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(removeProduct(1)).rejects.toThrow("Product not found");
    });
  });
});
