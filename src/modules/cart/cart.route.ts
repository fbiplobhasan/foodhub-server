import express from "express";
import { CartController } from "./cart.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.get("/", auth(UserRole.CUSTOMER), CartController.getMyCart);

router.post("/add", auth(UserRole.CUSTOMER), CartController.addToCart);

router.delete(
  "/:mealId",
  auth(UserRole.CUSTOMER),
  CartController.removeCartItem,
);

export const cartRoutes = router;
