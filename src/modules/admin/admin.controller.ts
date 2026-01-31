import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.createCategory(req.body);

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

const getAllUsers = async (req: Request, res: Response) => {
  const result = await AdminService.getAllUsers();
  res.status(200).json({ success: true, data: result });
};

const getAllCategories = async (req: Request, res: Response) => {
  const result = await AdminService.getAllCategories();
  res.status(200).json({ success: true, data: result });
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    const result = await AdminService.updateUserStatus(
      userId as string,
      status,
    );
    res
      .status(200)
      .json({ success: true, message: `User is now ${status}`, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  const result = await AdminService.getAllOrders();
  res.status(200).json({ success: true, data: result });
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await AdminService.deleteCategory(id as string);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully!",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error.message ||
        "Could not delete category. Ensure no meals are linked to it.",
    });
  }
};
export const AdminController = {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
  deleteCategory,
  createCategory,
  getAllCategories,
};
