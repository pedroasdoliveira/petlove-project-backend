const dto = {
  id: 1,
  name: "John",
  nextRole: null,
  system: 3,
  person: 4,
  technology: 2.92,
  process: 4,
  influence: 3.75,
};

const specialys = [
  {
    performance: "Trainee",
    description: "Trainee",
    system: 1,
    person: 2,
    technology: 0.8,
    process: 1,
    influence: 1.4,
  },
  {
    performance: "Junior",
    description: "Junior",
    system: 1.8,
    person: 2.3,
    technology: 2.6,
    process: 1.6,
    influence: 2,
  },
  {
    performance: "Pleno",
    description: "Pleno",
    system: 3.1,
    person: 2.4,
    technology: 3.1,
    process: 2.3,
    influence: 2.6,
  },
  {
    performance: "Senior",
    description: "Senior",
    system: 3.6,
    person: 2.7,
    technology: 3.4,
    process: 2.3,
    influence: 2.8,
  },
  {
    performance: "Especialista",
    description: "Especialista",
    system: 4.7,
    person: 2.2,
    technology: 4.2,
    process: 2.3,
    influence: 2.8,
  },
  {
    performance: "Tech-Lead",
    description: "Tech Lead",
    system: 3.8,
    person: 3.6,
    technology: 3.7,
    process: 3.8,
    influence: 3.7,
  },
];

const specialys2 = [
  {
    performance: "Trainee",
    description: "Trainee",
    system: 100,
    person: 200,
    technology: 80,
    process: 100,
    influence: 140,
  },
  {
    performance: "Junior",
    description: "Junior",
    system: 180,
    person: 230,
    technology: 260,
    process: 160,
    influence: 200,
  },
  {
    performance: "Pleno",
    description: "Pleno",
    system: 310,
    person: 240,
    technology: 310,
    process: 230,
    influence: 260,
  },
  {
    performance: "Senior",
    description: "Senior",
    system: 360,
    person: 270,
    technology: 340,
    process: 230,
    influence: 280,
  },
  {
    performance: "Especialista",
    description: "Especialista",
    system: 470,
    person: 220,
    technology: 420,
    process: 230,
    influence: 280,
  },
  {
    performance: "Tech-Lead",
    description: "Tech Lead",
    system: 380,
    person: 360,
    technology: 370,
    process: 380,
    influence: 370,
  },
];

const result = specialys.map((specialy) => {
  const { performance, system, person, technology, process, influence } =
    specialy;
  const systemDiff = system - dto.system;
  const personDiff = person - dto.person;
  const technologyDiff = technology - dto.technology;
  const processDiff = process - dto.process;
  const influenceDiff = influence - dto.influence;

  const totalDiff =
    Math.abs(systemDiff) +
    Math.abs(personDiff) +
    Math.abs(technologyDiff) +
    Math.abs(processDiff) +
    Math.abs(influenceDiff);
  return { performance, totalDiff: (totalDiff / 100) };
});

console.log(result);

const min = result.reduce((prev, current) =>
  prev.totalDiff < current.totalDiff ? prev : current,
);

console.log(min);

const teste = {
  system: 1 + 2 + 3 + 1 + 290,
  ...dto
}

console.log(teste)
console.log(teste.system / 100)
console.log(.99999992345)

console.log(Math.round(teste.system / 100))
