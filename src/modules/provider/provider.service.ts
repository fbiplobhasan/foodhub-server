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

export const providerService = {
  createProfile,
};
