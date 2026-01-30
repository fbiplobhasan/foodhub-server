import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  const result = await AdminService.getAllUsers();
  res.status(200).json({ success: true, data: result });
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    const result = await AdminService.updateUserStatus(userId as string, status);
    res.status(200).json({ success: true, message: `User is now ${status}`, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  const result = await AdminService.getAllOrders();
  res.status(200).json({ success: true, data: result });
};

export const AdminController = { getAllUsers, updateUserStatus, getAllOrders };