import express from "express";
import { AdminController } from "./admin.controller";
import auth, { UserRole } from "../../middleware/auth";
import { prisma } from "../../lib/prisma";

const router = express.Router();

router.get("/get-all-users", auth(UserRole.ADMIN), AdminController.getAllUsers);

router.get("/get-all-orders", auth(UserRole.ADMIN), AdminController.getAllOrders);

router.patch(
  "/:userId",
  auth(UserRole.ADMIN),
  AdminController.updateUserStatus,
);


export const adminRoutes = router;
