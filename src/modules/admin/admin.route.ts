import express from "express";
import { AdminController } from "./admin.controller";
import auth, { UserRole } from "../../middleware/auth";
import { prisma } from "../../lib/prisma";

const router = express.Router();

router.get("/get-all-users", auth(UserRole.ADMIN), AdminController.getAllUsers);

router.get("/orders", auth(UserRole.ADMIN), AdminController.getAllOrders);

router.post("/add-category", auth(UserRole.ADMIN), async (req, res) => {
  const result = await prisma.category.create({ data: req.body });
  res.json({ success: true, data: result });
});

router.patch(
  "/:userId",
  auth(UserRole.ADMIN),
  AdminController.updateUserStatus,
);

router.delete("/categories/:id", auth(UserRole.ADMIN), async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id as string } });
  res.json({ success: true, message: "Category deleted" });
});

export const adminRoutes = router;
