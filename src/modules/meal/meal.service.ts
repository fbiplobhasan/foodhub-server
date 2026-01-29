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

const getAllMeals = async (categoryId?: string) => {
  return await prisma.meal.findMany({
    where: categoryId ? { categoryId } : {},
    include: {
      category: true,
      provider: {
        select: { storeName: true, address: true },
      },
    },
  });
};

export const mealService = {
  createMeal,
  getAllMeals,
};
