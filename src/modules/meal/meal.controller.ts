import { Request, Response } from "express";
import { mealService } from "./meal.service";

const createMeal = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No user found",
      });
    }

    if (user.role !== "PROVIDER") {
      return res.status(403).json({
        success: false,
        message: "Only providers can create meals",
      });
    }

    const result = await mealService.createMeal(req.body, user.id);

    return res.status(201).json({
      success: true,
      message: "Meal created successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create meal",
    });
  }
};

const getAllMeals = async (req: Request, res: Response) => {
  const { categoryId } = req.query;
  const result = await mealService.getAllMeals(categoryId as string);
  res.status(200).json({ success: true, data: result });
};

export const mealController = {
  createMeal,
  getAllMeals,
};
