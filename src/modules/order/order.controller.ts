import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    console.log("Logged in User:", req.body);
    const result = await orderService.createOrder(
      (req as any).user.id,
      req.body,
    );
    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getMyOrders((req as any).user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const providerId = (req as any).user.id;

    const result = await orderService.updateOrderStatus(
      id as string,
      status,
      providerId,
    );

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getProviderOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getProviderOrders((req as any).user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const placeOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { deliveryAddress } = req.body;

    if (!deliveryAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Address required." });
    }

    const result = await orderService.placeOrder(userId, deliveryAddress);

    res.status(201).json({
      success: true,
      message: "Order successful.!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const orderController = {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  getProviderOrders,
  placeOrder,
};
