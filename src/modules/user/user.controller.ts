import { Request, Response } from "express";
import { UserService } from "./user.service";

const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const updateData = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Invalid user!" });
    }

    const result = await UserService.updateProfile(userId, updateData);

    res.status(200).json({
      success: true,
      message: "Updated profile successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const UserController = {updateProfile};
