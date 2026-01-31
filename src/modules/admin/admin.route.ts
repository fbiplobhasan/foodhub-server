import express from "express";
import { AdminController } from "./admin.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get("/users", auth(UserRole.ADMIN), AdminController.getAllUsers);

router.get("/orders", auth(UserRole.ADMIN), AdminController.getAllOrders);

router.get("/categories", AdminController.getAllCategories);

router.post(
  "/categories",
  auth(UserRole.ADMIN),
  AdminController.createCategory,
);

router.delete(
  "/categories/:id",
  auth(UserRole.ADMIN),
  AdminController.deleteCategory,
);

router.patch(
  "/users/:userId",
  auth(UserRole.ADMIN),
  AdminController.updateUserStatus,
);

export const adminRoutes = router;
