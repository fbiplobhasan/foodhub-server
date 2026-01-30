import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.post(
  "/create-order",
  auth(UserRole.CUSTOMER),
  orderController.createOrder,
);

router.get(
  "/",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  orderController.getProviderOrders,
);
router.get("/my-orders", auth(UserRole.CUSTOMER), orderController.getMyOrders);

router.patch(
  "/:id",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  orderController.updateOrderStatus,
);

export const orderRoutes = router;
