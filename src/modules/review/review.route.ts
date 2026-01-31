import express from "express";
import { ReviewController } from "./review.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get("/meal/:mealId", ReviewController.getMealReviews);

router.post("/add", auth(UserRole.CUSTOMER), ReviewController.createReview);

export const reviewRoutes = router;
