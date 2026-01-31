import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: { name: string }) => {
  const isExist = await prisma.category.findFirst({
    where: {
      name: {
        equals: payload.name,
        mode: "insensitive",
      },
    },
  });

  if (isExist) {
    throw new Error("This category already exists!");
  }

  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

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

const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: { _count: { select: { meals: true } } },
  });
};

const updateUserStatus = async (userId: string, status: UserStatus) => {
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

const deleteCategory = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("Category not found!");
  }

  const result = await prisma.category.delete({
    where: { id: categoryId },
  });

  return result;
};

export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
  deleteCategory,
  createCategory,
  getAllCategories,
};
