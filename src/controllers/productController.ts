import { Request, Response } from "express";
import { addProduct, listProducts, modifyProduct, removeProduct } from "../services/productService";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await addProduct(req.body, req.file);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const products = await listProducts(filters);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await modifyProduct(parseInt(req.params.id), req.body);
    res.status(200).json(updatedProduct);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await removeProduct(parseInt(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
