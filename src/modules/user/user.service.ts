import { prisma } from "../../lib/prisma";

const updateProfile = async (userId: string, updateData: any) => {
  const allowedData = {
    name: updateData.name,
    phone: updateData.phone,
    address: updateData.address,
    image: updateData.image,
  };

  return await prisma.user.update({
    where: { id: userId },
    data: allowedData,
  });
};
export const UserService = { updateProfile };
