import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get(
  "/my-orders",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  orderController.getProviderOrders,
);

router.get(
  "/provider-orders",
  auth(UserRole.PROVIDER),
  orderController.getMyOrders,
);

router.post(
  "/place-order",
  auth(UserRole.CUSTOMER),
  orderController.placeOrder,
);

router.post(
  "/create-order",
  auth(UserRole.CUSTOMER),
  orderController.createOrder,
);

router.patch(
  "/:id",
  auth(UserRole.PROVIDER, UserRole.ADMIN),
  orderController.updateOrderStatus,
);

export const orderRoutes = router;
