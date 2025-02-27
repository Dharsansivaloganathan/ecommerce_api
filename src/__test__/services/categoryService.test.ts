import { addCategory, listCategories, modifyCategory, removeCategory } from "../../services/categoryService";
import Category from "../../models/Category";

jest.mock("../../models/Category");

describe("Category Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addCategory", () => {
    it("should add a new category", async () => {
      const mockCategoryData = { name: "Electronics", description: "Electronic gadgets" };

      (Category.create as jest.Mock).mockResolvedValue({
        id: 1,
        ...mockCategoryData,
      });

      const result = await addCategory(mockCategoryData);

      expect(Category.create).toHaveBeenCalledWith(mockCategoryData);
      expect(result).toEqual({ id: 1, ...mockCategoryData });
    });

    it("should throw an error if required fields are missing", async () => {
      await expect(addCategory({})).rejects.toThrow("Missing required fields");
    });
  });

  describe("listCategories", () => {
    it("should return a list of categories", async () => {
      const mockCategories = [
        { id: 1, name: "Electronics", description: "Electronic gadgets" },
        { id: 2, name: "Clothing", description: "Fashion items" },
      ];

      (Category.findAll as jest.Mock).mockResolvedValue(mockCategories);

      const result = await listCategories();

      expect(Category.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });
  });

  describe("modifyCategory", () => {
    it("should update a category", async () => {
      const mockCategory = {
        id: 1,
        name: "Old Name",
        update: jest.fn().mockResolvedValue(true),
      };

      (Category.findByPk as jest.Mock).mockResolvedValue(mockCategory);

      const updatedData = { name: "Updated Name" };

      const result = await modifyCategory(1, updatedData);

      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(mockCategory.update).toHaveBeenCalledWith(updatedData);
      expect(result).toEqual(mockCategory);
    });

    it("should throw an error if category is not found", async () => {
      (Category.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(modifyCategory(1, { name: "New Name" })).rejects.toThrow("Category not found");
    });
  });

  describe("removeCategory", () => {
    it("should delete a category", async () => {
      const mockCategory = {
        id: 1,
        destroy: jest.fn().mockResolvedValue(true),
      };

      (Category.findByPk as jest.Mock).mockResolvedValue(mockCategory);

      await removeCategory(1);

      expect(Category.findByPk).toHaveBeenCalledWith(1);
      expect(mockCategory.destroy).toHaveBeenCalled();
    });

    it("should throw an error if category is not found", async () => {
      (Category.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(removeCategory(1)).rejects.toThrow("Category not found");
    });
  });
});
