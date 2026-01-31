import express from "express";
import { mealRouter } from "./modules/meal/meal.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { providerRoutes } from "./modules/provider/provider.route";
import { orderRoutes } from "./modules/order/order.route";
import { cartRoutes } from "./modules/cart/cart.route";
import { reviewRoutes } from "./modules/review/review.route";
import { userRoutes } from "./modules/user/user.route";
import { adminRoutes } from "./modules/admin/admin.route";

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
  }),
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));


app.use("/api/meals", mealRouter); //* done 

app.use("/api/providers", providerRoutes);

app.use("/api/orders", orderRoutes); //* done

app.use("/api/cart", cartRoutes);  //* done

app.use("/api/admin", adminRoutes); //* done

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/review", reviewRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Food Hub API" });
});

export default app;
