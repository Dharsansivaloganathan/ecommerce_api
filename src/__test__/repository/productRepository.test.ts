import Product from "../../models/Product";
import * as productRepository from "../../repositories/productRepository";

jest.mock("../../models/Product", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe("Product Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all products", async () => {
    const mockProducts = [{ id: 1, name: "Laptop", price: 1000 }];
    (Product.findAll as jest.Mock).mockResolvedValue(mockProducts);

    const result = await productRepository.getAllProducts();
    expect(result).toEqual(mockProducts);
    expect(Product.findAll).toHaveBeenCalledTimes(1);
  });

  it("should fetch a product by ID", async () => {
    const mockProduct = { id: 1, name: "Laptop", price: 1000 };
    (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

    const result = await productRepository.getProductById(1);
    expect(result).toEqual(mockProduct);
    expect(Product.findByPk).toHaveBeenCalledWith(1);
  });

  it("should create a new product", async () => {
    const newProduct = { name: "Laptop", price: 1000, categoryId: 1 };
    const createdProduct = { id: 1, ...newProduct };

    (Product.create as jest.Mock).mockResolvedValue(createdProduct);

    const result = await productRepository.createProduct(newProduct);
    expect(result).toEqual(createdProduct);
    expect(Product.create).toHaveBeenCalledWith(newProduct);
  });

  it("should update a product", async () => {
    const productId = 1;
    const updatedProductData = { name: "Gaming Laptop", price: 1500 };

    (Product.update as jest.Mock).mockResolvedValue([1]);

    const result = await productRepository.updateProduct(productId, updatedProductData);
    expect(result).toEqual([1]);
    expect(Product.update).toHaveBeenCalledWith(updatedProductData, { where: { id: productId } });
  });

  it("should delete a product", async () => {
    const productId = 1;
    (Product.destroy as jest.Mock).mockResolvedValue(1);

    const result = await productRepository.deleteProduct(productId);
    expect(result).toEqual(1);
    expect(Product.destroy).toHaveBeenCalledWith({ where: { id: productId } });
  });
});
