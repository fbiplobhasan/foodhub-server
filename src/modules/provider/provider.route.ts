import { Router } from "express";
import { providerController } from "./provider.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/", providerController.getAllProviders);

router.post(
  "/create-profile",
  auth(UserRole.PROVIDER),
  providerController.createProfile,
);

router.get(
  "/orders",
  auth(UserRole.PROVIDER),
  providerController.getProviderOrders,
);

router.patch(
  "/update-profile",
  auth(UserRole.PROVIDER),
  providerController.updateProfile,
);

export const providerRoutes = router;
