import express from "express";
import auth, { UserRole } from "../../middleware/auth";
import { UserController } from "./user.controller";

const router = express.Router();

router.patch(
  "/update-profile",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER),
  UserController.updateProfile,
);

export const userRoutes = router;
