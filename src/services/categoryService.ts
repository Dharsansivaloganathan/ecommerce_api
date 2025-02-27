import { createCategory, getAllCategories, findCategoryById, updateCategory, deleteCategory } from "../repositories/categoryRepository";

export const addCategory = async (categoryData: any) => {
  return await createCategory(categoryData);
};

export const listCategories = async () => {
  return await getAllCategories();
};

export const modifyCategory = async (id: number, updateData: any) => {
  return await updateCategory(id, updateData);
};

export const removeCategory = async (id: number) => {
  return await deleteCategory(id);
};
