import { prisma } from "../../lib/prisma";

const updateProfile = async (
  userId: string,
  updateData: {
    name?: string;
    phone?: string;
    address?: string;
    image?: string;
  },
) => {
  return await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
};

export const UserService = { updateProfile };
