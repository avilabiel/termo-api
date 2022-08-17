import { PrismaClient } from "@prisma/client";
import Player, { PlayerRepository } from "@/types/player";

const prisma = new PrismaClient({ log: ["query", "info"] });

export default class PlayerRepositoryPrismaMySQL implements PlayerRepository {
  async create(player: Player): Promise<Player> {
    const persistedPlayer = await prisma.player.create({ data: { ...player } });

    return persistedPlayer;
  }

  async addGuessCountByUserId({ userId }: { userId: any }): Promise<void> {
    const persistedPlayer = await prisma.player.findUnique({
      where: {
        id: userId,
      },
    });

    const updatedPlayer = await prisma.player.update({
      where: {
        id: userId,
      },
      data: {
        count: persistedPlayer.count + 1,
      },
    });

    console.log({ updatedPlayer });
  }

  async getGuessCountByUserId({ userId }: { userId: any }): Promise<number> {
    const persistedPlayer = await prisma.player.findUnique({
      where: {
        id: userId,
      },
    });

    return persistedPlayer.count;
  }
}
