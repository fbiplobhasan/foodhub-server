import { prisma } from "../../lib/prisma";

const addToCart = async (userId: string, mealId: string, quantity: number) => {
  const meal = await prisma.meal.findUnique({ where: { id: mealId } });
  if (!meal) throw new Error("This meal is no longer available!");

  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }

  return await prisma.cartItem.upsert({
    where: {
      cartId_mealId: {
        cartId: cart.id,
        mealId: mealId,
      },
    },
    update: {
      quantity: { increment: quantity },
    },
    create: {
      cartId: cart.id,
      mealId: mealId,
      quantity: quantity,
    },
  });
};

const getMyCart = async (userId: string) => {
  return await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          meal: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
            },
          },
        },
      },
    },
  });
};

const removeCartItem = async (userId: string, mealId: string) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) throw new Error("Cart not found!");

  return await prisma.cartItem.delete({
    where: {
      cartId_mealId: {
        cartId: cart.id,
        mealId: mealId,
      },
    },
  });
};

export const CartService = {
  addToCart,
  getMyCart,
  removeCartItem
};
