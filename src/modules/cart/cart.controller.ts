import { Request, Response } from "express";
import { CartService } from "./cart.service";

interface AuthRequest extends Request {
  user?: any;
}

const addToCart = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    if (!user || !user.id) {
      return res.status(401).json({
        success: false,
        message: "You must be logged in to add items to the cart",
      });
    }

    const userId = user.id;
    const { mealId, quantity } = req.body;

    if (!mealId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Meal ID and quantity are required",
      });
    }

    const result = await CartService.addToCart(userId, mealId, quantity);

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const getMyCart = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const userId = user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const result = await CartService.getMyCart(userId);

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: result || { items: [] },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const CartController = {
  addToCart,
  getMyCart,
};
