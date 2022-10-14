import {PrismaClient}  from "@prisma/client";

const prisma = new PrismaClient();

const seeds = Object.entries({
  ...require('./seed/01-user'),
  ...require('./seed/02-Test-crud'),
  ...require('./seed/03-specialties'),
});


(async () => {
	for (const [model, func] of seeds) {
		if (typeof func !== "function") {
			continue;
		}

		console.info(`Seeding model '${model}'...`);

		await func(prisma);
	}
})()
	.catch((e) => {
		console.error(e);

		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
