import express from "express";
import { mealRouter } from "./modules/meal/meal.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { providerRoutes } from "./modules/provider/provider.route";
import { categoryRoutes } from "./modules/category/category.route";
import { orderRoutes } from "./modules/order/order.route";
import { cartRoutes } from "./modules/cart/cart.route";
import { reviewRoutes } from "./modules/review/review.route";
import { userRoutes } from "./modules/user/user.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { adminCategorymanagementRoute } from "./modules/admin/admin.category.management";

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
  }),
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/v1/meal", mealRouter);

app.use("/api/v1/providers", providerRoutes);

app.use("/api/v1/category", categoryRoutes);

app.use("/api/v1/order", orderRoutes);

app.use("/api/v1/cart", cartRoutes);

app.use("/api/v1/review", reviewRoutes);

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/admin", adminRoutes);

app.use("/api/v1/admin", adminCategorymanagementRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Food Hub API" });
});

export default app;
