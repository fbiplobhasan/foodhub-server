import { Request, Response } from "express";
import { providerService } from "./provider.service";

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

export const providerController = {
  createProfile,
  getAllProviders,
};
