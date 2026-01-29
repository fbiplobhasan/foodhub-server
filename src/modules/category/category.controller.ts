import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const result = await categoryService.createCategory(name);
    res.status(201).json({
      success: true,
      message: "Category created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create category",
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategories();
  res.status(200).json({ success: true, data: result });
}

export const categoryController = {
  createCategory,
  getAllCategories
};