import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { mealId, rating, comment } = req.body;

    const result = await ReviewService.createReview(userId, mealId, rating, comment);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const ReviewController = { createReview };