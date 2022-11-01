import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

export const users: Prisma.UserCreateInput[] = [
  {
    name: "Giovanne Berteli",
    email: "giovanne@bootcamp.com",
    password: "Petlove@123",
    role: "Tech-lead",
    chapter: "backend",
    emailNotification: "all",
    isVerified: true,
    isAdmin: true,
    profilePicture: "https://i.imgur.com/5gC7saF.jpeg",
    team: "Gestor",
  },
  {
    name: "João Vitor",
    email: "joao@bootcamp.com",
    password: "Petlove@123",
    role: "Tech-lead",
    chapter: "backend",
    emailNotification: "all",
    isVerified: true,
    isAdmin: true,
    profilePicture: "https://i.imgur.com/5gC7saF.jpeg",
    team: "Gestor",
  },
  {
    name: "Pedro Oliveira",
    email: "pedro@bootcamp.com",
    password: "Petlove@123",
    role: "Tech-lead",
    chapter: "backend",
    emailNotification: "all",
    isVerified: true,
    isAdmin: true,
    profilePicture: "https://i.imgur.com/5gC7saF.jpeg",
    team: "Gestor",
  },
  {
    name: "Felipe Felipe",
    email: "felipe@bootcamp.com",
    password: "Petlove@123",
    role: "Tech-lead",
    chapter: "backend",
    emailNotification: "all",
    isVerified: true,
    isAdmin: true,
    profilePicture: "https://i.imgur.com/5gC7saF.jpeg",
    team: "Gestor",
  },
  {
    name: "Bruna Bomfim",
    email: "bruna@bootcamp.com",
    password: "Petlove@123",
    role: "Tech-lead",
    chapter: "backend",
    emailNotification: "all",
    isVerified: true,
    isAdmin: true,
    profilePicture: "https://i.imgur.com/5gC7saF.jpeg",
    team: "Gestor",
  },
  {
    name: "pessoa teste 1",
    email: "testeteste1@bootcamp.com",
    password: "Petlove@123",
    role: "Trainee",
    chapter: "backend",
    isVerified: true,
    profilePicture: "https://i.imgur.com/5ROpvzp.jpeg",
    team: "Cachorro",
    results: {
      createMany: {
        data: [
          {
            nextRole: "Junior",
            system: 100,
            person: 200,
            technology: 280,
            process: 100,
            influence: 140,
            isValided: "Não",
            createdAt: new Date("2021-06-01"),
            updatedAt: new Date("2021-06-01"),
          },
          {
            nextRole: "Trainee",
            system: 100,
            person: 180,
            technology: 40,
            process: 120,
            influence: 110,
            isValided: "Sim",
            createdAt: new Date("2022-06-01"),
            updatedAt: new Date("2022-06-01"),
          },
        ],
      },
    },
  },
  {
    name: "pessoa teste 2",
    email: "testeteste2@bootcamp.com",
    password: "Petlove@123",
    role: "Especialista",
    chapter: "frontend",
    isVerified: true,
    profilePicture: "https://i.imgur.com/alwr7.jpeg",
    team: "Cachorro",
    results: {
      createMany: {
        data: [
          {
            nextRole: "Tech-Lead",
            system: 180,
            person: 360,
            technology: 470,
            process: 420,
            influence: 470,
            isValided: "Não",
            createdAt: new Date("2021-06-01"),
            updatedAt: new Date("2021-06-01"),
          },
          {
            nextRole: "Trainee",
            system: 100,
            person: 180,
            technology: 40,
            process: 120,
            influence: 110,
            isValided: "Sim",
            createdAt: new Date("2022-06-01"),
            updatedAt: new Date("2022-06-01"),
          },
        ],
      },
    },
  },
  {
    name: "pessoa teste 3",
    email: "testeteste3@bootcamp.com",
    password: "Petlove@123",
    role: "Junior",
    chapter: "backend",
    isVerified: true,
    profilePicture: "https://i.imgur.com/Di7CszA.jpeg",
    team: "Gato",
    results: {
      createMany: {
        data: [
          {
            nextRole: "Junior",
            system: 100,
            person: 70,
            technology: 220,
            process: 120,
            influence: 110,
            isValided: "Não",
            createdAt: new Date("2021-06-01"),
            updatedAt: new Date("2021-06-01"),
          },
          {
            nextRole: "Junior",
            system: 100,
            person: 200,
            technology: 280,
            process: 100,
            influence: 140,
            isValided: "Sim",
            createdAt: new Date("2022-06-01"),
            updatedAt: new Date("2022-06-01"),
          },
        ],
      },
    },
  },
  {
    name: "pessoa teste 4",
    email: "testeteste4@bootcamp.com",
    password: "Petlove@123",
    role: "Pleno",
    chapter: "frontend",
    isVerified: true,
    profilePicture: "https://i.imgur.com/7PI1xwd.jpeg",
    team: "Gato",
    results: {
      createMany: {
        data: [
          {
            nextRole: "Junior",
            system: 100,
            person: 200,
            technology: 280,
            process: 100,
            influence: 140,
            isValided: "Não",
            createdAt: new Date("2021-06-01"),
            updatedAt: new Date("2021-06-01"),
          },
          {
            nextRole: "Pleno",
            system: 300,
            person: 220,
            technology: 310,
            process: 210,
            influence: 190,
            isValided: "Sim",
            createdAt: new Date("2022-06-01"),
            updatedAt: new Date("2022-06-01"),
          },
        ],
      },
    },
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
