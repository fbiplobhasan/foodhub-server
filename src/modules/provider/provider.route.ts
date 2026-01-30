import { Router } from "express";
import { providerController } from "./provider.controller";
import auth, { UserRole } from "../../middleware/auth";
import { orderController } from "../order/order.controller";

const router = Router();

router.get("/", providerController.getAllProviders);

router.get(
  "/provider-orders",
  auth(UserRole.PROVIDER),
  orderController.getProviderOrders,
);

router.post(
  "/create-profile",
  auth(UserRole.PROVIDER, UserRole.CUSTOMER, UserRole.ADMIN),
  providerController.createProfile,
);

router.patch(
  "/:orderId/status",
  auth(UserRole.PROVIDER),
  orderController.updateOrderStatus,
);

export const providerRoutes = router;
