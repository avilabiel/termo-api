import { PrismaClient } from "@prisma/client";
import Player, { PlayerRepository } from "@/types/player";

const prisma = new PrismaClient({ log: ["query", "info"] });

export default class PlayerRepositoryPrismaMySQL implements PlayerRepository {
  async create(player: Player): Promise<Player> {
    const persistedPlayer = await prisma.player.create({ data: { ...player } });

    return persistedPlayer;
  }

  async addGuessCountByUserId({
    userId: string,
  }: {
    userId: any;
  }): Promise<void> {
    return;
  }

  async getGuessCountByUserId({
    userId: string,
  }: {
    userId: any;
  }): Promise<number> {
    return 0;
  }
}
