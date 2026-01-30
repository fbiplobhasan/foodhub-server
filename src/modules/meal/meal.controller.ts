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
  try {
    const result = await mealService.getAllMeals(req.query);
    res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getSingleMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await mealService.getSingleMeal(id as string);

    res.status(200).json({
      success: true,
      message: "Meal fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Opps data not found!",
    });
  }
};

const updateMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const providerId = (req as any).user.id;
    const result = await mealService.updateMeal(
      id as string,
      providerId,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Meal updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const result = await mealService.deleteMeal(id as string, userId);

    res.status(200).json({
      success: true,
      message: "Meal deleted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(403).json({
      success: false,
      message: error.message || "You are not authorized!",
    });
  }
};

export const mealController = {
  createMeal,
  getAllMeals,
  getSingleMeal,
  deleteMeal,
  updateMeal,
};
