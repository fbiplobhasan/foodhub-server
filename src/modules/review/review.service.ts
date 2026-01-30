import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  mealId: string,
  rating: number,
  comment: string,
) => {
  const hasOrdered = await prisma.order.findFirst({
    where: {
      customerId: userId,
      status: "DELIVERED",
      items: {
        array_contains: [{ mealId: mealId }],
      },
    },
  });

  if (!hasOrdered) {
    throw new Error(
      "You can only review meals you have successfully received (DELIVERED)!",
    );
  }

  return await prisma.review.create({
    data: {
      customerId: userId,
      mealId,
      rating,
      comment,
    },
  });
};

export const ReviewService = { createReview };
