import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMeal = async (payload: any, userId: string) => {
  try {
    const providerProfile = await prisma.providerProfile.findUnique({
      where: {
        userId,
      },
    });

    if (!providerProfile) {
      throw new Error(
        "Provider profile not found. Please create a profile first.",
      );
    }
    const result = await prisma.meal.create({
      data: {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        image: payload.image,
        categoryId: payload.categoryId,
        providerId: providerProfile.id,
      },
      include: {
        category: true,
        provider: true,
      },
    });
    return result;
  } catch (error: any) {
    console.log("Error in createMeal service:", error);
    throw new Error(
      error.message || "Something went wrong while creating meal.",
    );
  }
};

const getAllMeals = async (query: any) => {
  const { categoryId, searchTerm, minPrice, maxPrice } = query;

  const where: Prisma.MealWhereInput = {};

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (searchTerm) {
    where.OR = [
      { name: { contains: searchTerm, mode: "insensitive" } },
      { description: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  if (minPrice || maxPrice) {
    where.price = {
      gte: minPrice ? parseFloat(minPrice) : undefined,
      lte: maxPrice ? parseFloat(maxPrice) : undefined,
    };
  }

  return await prisma.meal.findMany({
    where,
    include: {
      category: true,
      provider: {
        select: { storeName: true, address: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getSingleMeal = async (id: string) => {
  const result = await prisma.meal.findUnique({
    where: { id },
    include: {
      category: true,
      provider: true,
    },
  });
  if (!result) throw new Error("Opps data not found!");
  return result;
};

const deleteMeal = async (mealId: string, userId: string) => {
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
    include: { provider: true },
  });

  if (!meal) throw new Error("Not available!");

  if (meal.provider.userId !== userId) {
    throw new Error("You are not authorized!");
  }

  return await prisma.meal.delete({
    where: { id: mealId },
  });
};

export const mealService = {
  createMeal,
  getAllMeals,
  deleteMeal,
  getSingleMeal,
};
