import Product from "../models/Product";

export const createProduct = async (productData: any) => {
  return await Product.create(productData);
};

export const getAllProducts = async () => {
  return await Product.findAll();
};

export const findProductById = async (id: number) => {
  return await Product.findByPk(id);
};

export const updateProduct = async (id: number, updateData: any) => {
  await Product.update(updateData, { where: { id } });
  return findProductById(id);
};

export const deleteProduct = async (id: number) => {
  return await Product.destroy({ where: { id } });
};

export function getProductById(arg0: number) {
    throw new Error("Function not implemented.");
}
