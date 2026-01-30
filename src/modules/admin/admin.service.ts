import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
};

const updateUserStatus = async (userId: string, status: "ACTIVE" | "BLOCK") => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status },
  });
};

const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      customer: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const AdminService = { getAllUsers, updateUserStatus, getAllOrders };
