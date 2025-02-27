import Category from "../../models/Category";
import * as categoryRepository from "../../repositories/categoryRepository";

jest.mock("../../models/Category", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe("Category Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all categories", async () => {
    const mockCategories = [{ id: 1, name: "Electronics" }];
    (Category.findAll as jest.Mock).mockResolvedValue(mockCategories);

    const result = await categoryRepository.getAllCategories();
    expect(result).toEqual(mockCategories);
    expect(Category.findAll).toHaveBeenCalledTimes(1);
  });

  it("should fetch a category by ID", async () => {
    const mockCategory = { id: 1, name: "Electronics" };
    (Category.findByPk as jest.Mock).mockResolvedValue(mockCategory);

    const result = await categoryRepository.getCategoryById(1);
    expect(result).toEqual(mockCategory);
    expect(Category.findByPk).toHaveBeenCalledWith(1);
  });

  it("should create a new category", async () => {
    const newCategory = { name: "Electronics" };
    const createdCategory = { id: 1, ...newCategory };

    (Category.create as jest.Mock).mockResolvedValue(createdCategory);

    const result = await categoryRepository.createCategory(newCategory);
    expect(result).toEqual(createdCategory);
    expect(Category.create).toHaveBeenCalledWith(newCategory);
  });

  it("should update a category", async () => {
    const categoryId = 1;
    const updatedCategoryData = { name: "Gaming" };

    (Category.update as jest.Mock).mockResolvedValue([1]);

    const result = await categoryRepository.updateCategory(categoryId, updatedCategoryData);
    expect(result).toEqual([1]);
    expect(Category.update).toHaveBeenCalledWith(updatedCategoryData, { where: { id: categoryId } });
  });

  it("should delete a category", async () => {
    const categoryId = 1;
    (Category.destroy as jest.Mock).mockResolvedValue(1);

    const result = await categoryRepository.deleteCategory(categoryId);
    expect(result).toEqual(1);
    expect(Category.destroy).toHaveBeenCalledWith({ where: { id: categoryId } });
  });
});
