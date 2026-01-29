import { Router } from "express";
import { categoryController } from "./category.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/", categoryController.getAllCategories);

router.post(
  "/create-category",
  auth(UserRole.ADMIN),
  categoryController.createCategory,
);

export const categoryRoutes = router;
