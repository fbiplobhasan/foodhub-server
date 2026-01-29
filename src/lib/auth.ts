import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma"; //import from .prisma not create instance

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // set "postgresql"
  }),
  trustedOrigins:[process.env.APP_URL! as string],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "CUSTOMER",
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
