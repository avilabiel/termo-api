import Player, { PlayerRepository } from "@/types/player";

type CountPlayer = {
  player: Player;
  count: number;
};

export default class PlayerRepositoryMemory implements PlayerRepository {
  private countPlayers: CountPlayer[] = [];

  constructor() {
    this.seed();
  }

  async addGuessCountByUserId({ userId }: { userId: any }): Promise<void> {
    const countPlayer = this.countPlayers.find(
      (countPlayer) => countPlayer.player.id == userId
    );

    countPlayer.count++;

    console.log(this.countPlayers);

    return;
  }

  async getGuessCountByUserId({ userId }: { userId: string }): Promise<number> {
    const countPlayer = this.countPlayers.find(
      (countPlayer) => countPlayer.player.id == userId
    );

    return countPlayer.count;
  }

  seed() {
    this.countPlayers.push({
      player: { id: "token-1234-token", name: "Testevaldo" },
      count: 0,
    });
  }
}
