import { PrismaClient } from "@prisma/client";

let prisma;

function getPrismaInstance() {
	try {
		if (process.env.NODE_ENV === "production") {
			prisma = new PrismaClient();
		} else {
			if (!global.prisma) {
				global.prisma = new PrismaClient();
			}

			prisma = global.prisma;
		}
		return prisma;
	} catch (err) {
		console.log(err);
	}
}

export default getPrismaInstance;
