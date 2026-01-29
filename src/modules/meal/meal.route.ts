import { Router } from "express";
import { mealController } from "./meal.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/create-meal",auth(), mealController.createMeal);

export const mealRouter = router;
