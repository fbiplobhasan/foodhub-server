import { Request, Response } from "express";
import { providerService } from "./provider.service";
import { prisma } from "../../lib/prisma";
import { orderService } from "../order/order.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.role !== "PROVIDER") {
      return res.status(403).json({
        success: false,
        message: "Only users with PROVIDER role can create a profile",
      });
    }

    const result = await providerService.createProfile(req.body, user.id);

    res.status(201).json({
      success: true,
      message: "Provider profile created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create profile",
    });
  }
};

const getAllProviders = async (req: Request, res: Response) => {
  try {
    const result = await providerService.getAllProviders();
    res.status(200).json({
      success: true,
      message: "Providers fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch providers",
    });
  }
};

const getProviderOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!providerProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Provider profile not found" });
    }

    const result = await orderService.getProviderOrders(providerProfile.id);

    res.status(200).json({
      success: true,
      message: "Provider orders fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const user = (req as any).user;

    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!providerProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Provider profile not found" });
    }

    const result = await orderService.updateOrderStatus(
      orderId as string,
      status,
      providerProfile.id,
    );

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const providerController = {
  createProfile,
  getAllProviders,
  getProviderOrders,
  updateOrderStatus,
};
