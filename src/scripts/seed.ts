import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  console.log("Starting Database Seed...");

  try {
    const adminEmail = "admin2@gmail.com";

    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      console.log("User already exists, skipping...");
      return;
    }

    const newAdmin = await prisma.user.create({
      data: {
        id: `admin-${Date.now()}`,
        name: "Admin2 Sha",
        email: adminEmail,
        password: "admin123456",
        role: UserRole.ADMIN,
        emailVerified: true,
        image: "https://ui-avatars.com/api/?name=Admin",
      },
    });

    console.log("Admin created directly in database:", newAdmin.email);
  } catch (error) {
    console.error("Seed Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
