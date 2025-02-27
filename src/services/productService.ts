import Product from "../models/Product";
import Category from "../models/Category";
import cloudinary from "../config/cloudinary";
import { Op } from "sequelize";

export const addProduct = async (productData: any, file?: Express.Multer.File) => {
  if (!productData.name || !productData.price || !productData.categoryId) {
    throw new Error("Missing required fields");
  }

  let imageUrl = "";
  if (file) {
    const uploadedImage = await cloudinary.uploader.upload(file.path);
    imageUrl = uploadedImage.secure_url;
  }

  return await Product.create({
    name: productData.name,
    description: productData.description,
    price: productData.price,
    stock: productData.stock || 0,
    categoryId: productData.categoryId,
    imageUrl,
  });
};


export const listProducts = async (filters: any) => {
  const { categoryId, minPrice, maxPrice, search, page = 1, limit = 10 } = filters;

  const whereClause: any = {};

  if (categoryId) {
    whereClause.categoryId = categoryId;
  }

  if (minPrice || maxPrice) {
    whereClause.price = {};
    if (minPrice) whereClause.price[Op.gte] = minPrice;
    if (maxPrice) whereClause.price[Op.lte] = maxPrice;
  }

  if (search) {
    whereClause.name = { [Op.iLike]: `%${search}%` }; 
  }

  const offset = (page - 1) * limit;

  const products = await Product.findAndCountAll({
    where: whereClause,
    include: [{ model: Category, attributes: ["name"] }],
    limit: parseInt(limit, 10),
    offset: parseInt(offset.toString(), 10),
    order: [["createdAt", "DESC"]],
  });

  return {
    totalProducts: products.count,
    totalPages: Math.ceil(products.count / limit),
    currentPage: parseInt(page, 10),
    products: products.rows,
  };
};

export const modifyProduct = async (productId: number, productData: any) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("Product not found");

  await product.update(productData);
  return product;
};

export const removeProduct = async (productId: number) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("Product not found");

  await product.destroy();
};
