import { PrismaClient } from "@prisma/client";

afterAll(async () => {
  const prisma = new PrismaClient({ log: ["query", "info"] });
  await prisma.player.deleteMany({});
});
