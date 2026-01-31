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
  const orders = await prisma.order.findMany({
    include: {
      customer: { select: { name: true, email: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return orders.filter((order: any) => {
    const items = order.items as any[];
    return items.some((item) => item.providerId === providerId);
  });
};

const updateProfile = async (
  userId: string,
  data: Partial<{ storeName: string; description: string; address: string }>,
) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw new Error("Provider profile not found!");
  }

  return await prisma.providerProfile.update({
    where: { userId },
    data,
  });
};

export const providerService = {
  createProfile,
  getAllProviders,
  getProviderOrders,
  updateProfile,
};
