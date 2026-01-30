import { Router } from "express";
import { mealController } from "./meal.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/", mealController.getAllMeals);

router.post("/create-meal", auth(), mealController.createMeal);

router.get("/:id", mealController.getSingleMeal);

router.delete(
  "/:id",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  mealController.deleteMeal,
);

export const mealRouter = router;
