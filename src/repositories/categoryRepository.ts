import Category from "../models/Category";

export const createCategory = async (categoryData: any) => {
  return await Category.create(categoryData);
};

export const getAllCategories = async () => {
  return await Category.findAll();
};

export const findCategoryById = async (id: number) => {
  return await Category.findByPk(id);
};

export const updateCategory = async (id: number, updateData: any) => {
  await Category.update(updateData, { where: { id } });
  return findCategoryById(id);
};

export const deleteCategory = async (id: number) => {
  return await Category.destroy({ where: { id } });
};

export function getCategoryById(arg0: number) {
    throw new Error("Function not implemented.");
}
