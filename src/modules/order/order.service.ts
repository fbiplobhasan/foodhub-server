import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createOrder = async (customerId: string, orderData: any) => {
  const { items, deliveryAddress, paymentMethod } = orderData;

  let totalAmount = 0;

  for (const item of items) {
    const meal = await prisma.meal.findUnique({ where: { id: item.mealId } });
    if (!meal) throw new Error(`Meal (ID: ${item.mealId}) not found.!`);

    totalAmount += meal.price * item.quantity;
  }

  const result = await prisma.order.create({
    data: {
      customerId,
      deliveryAddress,
      totalAmount,
      items,
      paymentMethod: paymentMethod || "COD",
      status: "PLACED",
      paymentStatus: "PENDING",
    },
    include: {
      customer: {
        select: { name: true, email: true },
      },
    },
  });

  return result;
};

const getMyOrders = async (customerId: string) => {
  return await prisma.order.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
  });
};

const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  providerId: string,
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found!");
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  return updatedOrder;
};

const getProviderOrders = async (providerUserId: string) => {
  return await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: { select: { name: true, email: true } } },
  });
};

export const orderService = {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  getProviderOrders,
};
