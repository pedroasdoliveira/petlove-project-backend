import { Prisma, PrismaClient } from "@prisma/client";

export const specialties: Prisma.SpecialtieCreateInput[] = [
  {
    performance: "Trainee",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Trainee",
    system: 100,
    person: 200,
    technology: 80,
    process: 100,
    influence: 140,
  },
  {
    performance: "Junior",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Junior",
    system: 180,
    person: 230,
    technology: 260,
    process: 160,
    influence: 200,
  },
  {
    performance: "Pleno",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Pleno",
    system: 310,
    person: 240,
    technology: 310,
    process: 230,
    influence: 260,
  },
  {
    performance: "Senior",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Senior",
    system: 360,
    person: 270,
    technology: 340,
    process: 230,
    influence: 280,
  },
  {
    performance: "Especialista",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Especialista",
    system: 470,
    person: 220,
    technology: 420,
    process: 230,
    influence: 280,
  },
  {
    performance: "Tech-Lead",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Tech-Lead",
    system: 380,
    person: 360,
    technology: 370,
    process: 380,
    influence: 370,
  },
];

export const specialtie = async (prisma: PrismaClient) => {
  for (const obj of Object.values(specialties)) {
    await prisma.specialtie.upsert({
      where: { performance: obj.performance },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
