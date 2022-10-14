const dto = {
  id: 1,
  name: 'John',
  nextRole: null,
  system: 3,
  person: 3,
  technology: 3,
  process: 3,
  influence: 3,
};

const specialys = [
  {
    performance: 'Trainee',
    description: 'Trainee',
    system: 1,
    person: 2,
    technology: 0.8,
    process: 1,
    influence: 1.4,
  },
  {
    performance: 'Junior',
    description: 'Junior',
    system: 1.8,
    person: 2.3,
    technology: 2.6,
    process: 1.6,
    influence: 2,
  },
  {
    performance: 'Pleno',
    description: 'Pleno',
    system: 3.1,
    person: 2.4,
    technology: 3.1,
    process: 2.3,
    influence: 2.6,
  },
  {
    performance: 'Senior',
    description: 'Senior',
    system: 3.6,
    person: 2.7,
    technology: 3.4,
    process: 2.3,
    influence: 2.8,
  },
  {
    performance: 'Especialista',
    description: 'Especialista',
    system: 4.7,
    person: 2.2,
    technology: 4.2,
    process: 2.3,
    influence: 2.8,
  },
  {
    performance: 'Tech-Lead',
    description: 'Tech Lead',
    system: 3.8,
    person: 3.6,
    technology: 3.7,
    process: 3.8,
    influence: 3.7,
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
  return { performance, totalDiff };
});

console.log(result);

const min = result.reduce((prev, current) =>
  prev.totalDiff < current.totalDiff ? prev : current,
);

console.log(min);
