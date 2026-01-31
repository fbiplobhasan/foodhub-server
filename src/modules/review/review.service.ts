import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  mealId: string,
  rating: number,
  comment: string,
) => {
  const orders = await prisma.order.findMany({
    where: {
      customerId: userId,
      status: "DELIVERED",
    },
  });

  const hasPurchased = orders.some((order: any) =>
    (order.items as any[]).some((item) => item.mealId === mealId),
  );

  if (!hasPurchased) {
    throw new Error("You can only review meals you have received!");
  }

  return await prisma.review.create({
    data: { customerId: userId, mealId, rating, comment },
  });
};

const getMealReviews = async (mealId: string) => {
  return await prisma.review.findMany({
    where: { mealId },
    include: {
      customer: { select: { name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const ReviewService = { createReview, getMealReviews };
