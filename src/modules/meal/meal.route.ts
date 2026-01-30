import { Router } from "express";
import { mealController } from "./meal.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/", mealController.getAllMeals);

router.post("/create-meal", auth(UserRole.PROVIDER), mealController.createMeal);

router.get("/:id", mealController.getSingleMeal);

router.patch("/:id", auth(UserRole.PROVIDER), mealController.updateMeal);

router.delete(
  "/:id",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  mealController.deleteMeal,
);

export const mealRouter = router;
