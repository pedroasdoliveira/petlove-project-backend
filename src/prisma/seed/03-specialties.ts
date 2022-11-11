import { Prisma, PrismaClient } from "@prisma/client";

export const specialties: Prisma.SpecialtieCreateInput[] = [
  {
    performance: "Trainee",
    description:
      "Os resultados dos gráficos mostram um perfil mais de iniciante e que pretende crescer na carreira.",
    system: 100,
    person: 200,
    technology: 80,
    process: 100,
    influence: 140,
  },
  {
    performance: "Junior",
    description:
      "Trata-se de um profissional iniciante com uma certa noção sobre suas funções e tarefas.",
    system: 180,
    person: 230,
    technology: 260,
    process: 160,
    influence: 200,
  },
  {
    performance: "Pleno",
    description:
      "Um profissional que já está há um certo tempo na área, com experiências intermediárias em suas funções e atividades, podendo ter uma responsabilidade maior do que antes.",
    system: 310,
    person: 240,
    technology: 310,
    process: 230,
    influence: 260,
  },
  {
    performance: "Senior",
    description:
      "Um profissional com grandes capacidades e experiência profissional, podendo contribuir com grandes projetos e tarefas mais complexas.",
    system: 360,
    person: 270,
    technology: 340,
    process: 230,
    influence: 280,
  },
  {
    performance: "Especialista",
    description:
      "Um especialista em realizar suas funções com maestria e com grandes capacidades.",
    system: 470,
    person: 220,
    technology: 420,
    process: 230,
    influence: 280,
  },
  {
    performance: "Tech-Lead",
    description:
      "Um líder dentro da equipe com as principais capacidades de cuidar e ajudar os outros integrantes e de gerir tarefas.",
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
