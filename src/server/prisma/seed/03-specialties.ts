import { Prisma, PrismaClient } from "@prisma/client";

export const specialties: Prisma.SpecialtieCreateInput[] = [
  {
    performance: "Inserir nome",
    description: "Inserir descrição",
    system: 0,
    person: 0,
    technology: 0,
    process: 0,
    influence: 0,
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
