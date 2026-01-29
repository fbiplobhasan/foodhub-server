import { prisma } from "../../lib/prisma";

const createCategory = async (name: string) => {
  const formattedName = name.trim();

  const existingCategory = await prisma.category.findFirst({
    where: {
      name: {
        equals: formattedName,
        mode: "insensitive",
      },
    },
  });

  if (existingCategory) {
    throw new Error("Already exist this category!");
  }

  return await prisma.category.create({
    data: { name: formattedName },
  });
};

export const categoryService = {
  createCategory,
};
