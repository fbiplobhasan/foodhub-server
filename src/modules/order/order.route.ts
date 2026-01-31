import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.post("/checkout", auth(UserRole.CUSTOMER), orderController.placeOrder);

router.get("/my-orders", auth(UserRole.CUSTOMER), orderController.getMyOrders);

router.get("/provider", auth(UserRole.PROVIDER), orderController.getProviderOrders);

router.get("/:id", auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), orderController.getSingleOrder);

router.patch("/:id", auth(UserRole.PROVIDER, UserRole.ADMIN), orderController.updateOrderStatus);

export const orderRoutes = router;
