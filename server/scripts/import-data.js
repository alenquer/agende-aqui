const { PrismaClient } = require("@prisma/client");
const servicesJson = require("./services.json");

const prisma = new PrismaClient();

prisma.service
	.createMany({ data: servicesJson.services })
	.then(() => console.log("Dados importados com sucesso!"))
	.catch(console.log)
	.finally(async () => await prisma.$disconnect());
