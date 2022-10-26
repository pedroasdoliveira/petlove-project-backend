import { Prisma, PrismaClient } from "@prisma/client";

export const specialties: Prisma.SpecialtieCreateInput[] = [
  {
    performance: "Trainee",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Trainee",
    system: 1,
    person: 2,
    technology: 0.8,
    process: 1,
    influence: 1.4,
  },
  {
    performance: "Junior",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Junior",
    system: 1.8,
    person: 2.3,
    technology: 2.6,
    process: 1.6,
    influence: 2,
  },
  {
    performance: "Pleno",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Pleno",
    system: 3.1,
    person: 2.4,
    technology: 3.1,
    process: 2.3,
    influence: 2.6,
  },
  {
    performance: "Senior",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Senior",
    system: 3.6,
    person: 2.7,
    technology: 3.4,
    process: 2.3,
    influence: 2.8,
  },
  {
    performance: "Especialista",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Especialista",
    system: 4.7,
    person: 2.2,
    technology: 4.2,
    process: 2.3,
    influence: 2.8,
  },
  {
    performance: "Tech-Lead",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Tech-Lead",
    system: 3.8,
    person: 3.6,
    technology: 3.7,
    process: 3.8,
    influence: 3.7,
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
