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

  const items = order.items as any[];
  const isOwner = items.some(
    (item) => item.providerId === providerId || item.mealId,
  );

  const paymentStatus = status === "DELIVERED" ? "PAID" : order.paymentStatus;

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      paymentStatus,
    },
  });

  return updatedOrder;
};

const getProviderOrders = async (providerUserId: string) => {
  return await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: { select: { name: true, email: true } } },
  });
};

const placeOrder = async (userId: string, deliveryAddress: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { meal: true } } },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const totalAmount = cart.items.reduce((sum, item) => {
    return sum + item.meal.price * item.quantity;
  }, 0);

  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customerId: userId,
        totalAmount,
        deliveryAddress,
        status: "PLACED",
        paymentMethod: "COD",
        paymentStatus: "PENDING",
        items: cart.items.map((item) => ({
          mealId: item.mealId,
          name: item.meal.name,
          price: item.meal.price,
          quantity: item.quantity,
        })) as any,
      },
    });

    await tx.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return order;
  });
};

export const orderService = {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  getProviderOrders,
  placeOrder,
};
