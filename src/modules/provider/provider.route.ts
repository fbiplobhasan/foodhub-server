import { Router } from "express";
import { providerController } from "./provider.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.post(
  "/create-profile",
  auth(UserRole.PROVIDER, UserRole.CUSTOMER, UserRole.ADMIN),
  providerController.createProfile,
);

export const providerRoutes = router;
