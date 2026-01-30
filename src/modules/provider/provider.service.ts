import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createProfile = async (data: any, userId: string) => {
  const existingProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (existingProfile) {
    throw new Error("Profile already exists for this user!");
  }

  return await prisma.providerProfile.create({
    data: {
      storeName: data.storeName,
      description: data.description,
      address: data.address,
      userId: userId,
    },
  });
};

const getAllProviders = async () => {
  return await prisma.providerProfile.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      _count: {
        select: { meals: true },
      },
    },
  });
};

const getProviderOrders = async (providerId: string) => {
  const providerMeals = await prisma.meal.findMany({
    where: { providerId },
    select: { id: true },
  });

  const mealIds = providerMeals.map((m) => m.id);

  const allOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  const filteredOrders = allOrders.filter((order: any) => {
    const items = order.items as any[];
    return items.some((item) => mealIds.includes(item.mealId));
  });

  return filteredOrders;
};

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
}

export const providerService = {
  createProfile,
  getAllProviders,
  getProviderOrders,
  updateOrderStatus
};
