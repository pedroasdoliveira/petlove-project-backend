import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

export const users: Prisma.UserCreateInput[] = [
  {
    name: "PetLove",
    email: "petlove@bootcamp.com",
    password: "Petlove@123",
    role: "Tech-lead",
    chapter: "backend",
    emailNotification: "all",
    isVerified: true,
    isAdmin: true,
    profilePicture: "https://i.imgur.com/5gC7saF.jpeg",
    team: "Gestor",
  },
];

export const user = async (prisma: PrismaClient) => {
  for (const obj of Object.values(users)) {
    await prisma.user.upsert({
      where: { email: obj.email },
      update: {},
      create: {
        ...obj,
        password: await bcrypt.hash(obj.password, 10),
      },
    });
  }
};
