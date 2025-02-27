import { Request, Response } from "express";
import { addCategory, listCategories, modifyCategory, removeCategory } from "../services/categoryService";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await addCategory(req.body);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await listCategories();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatedCategory = await modifyCategory(parseInt(req.params.id), req.body);
    res.status(200).json(updatedCategory);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await removeCategory(parseInt(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
