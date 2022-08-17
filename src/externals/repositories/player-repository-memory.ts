import Player, { PlayerRepository } from "@/types/player";

export default class PlayerRepositoryMemory implements PlayerRepository {
  private players: Player[] = [];
  private static instance: PlayerRepositoryMemory;

  private constructor() {}

  static getOrBuild() {
    if (!this.instance) {
      this.instance = new PlayerRepositoryMemory();
    }

    return this.instance;
  }

  async create(player: Player): Promise<Player> {
    player.id = this.fakeId(10);
    player.createdAt = new Date();

    this.players.push(player);

    return player;
  }

  async addGuessCountByUserId({ userId }: { userId: any }): Promise<void> {
    console.log({ players: this.players, userId });

    const player = this.players.find((player) => player.id == userId);

    player.count++;

    return;
  }

  async getGuessCountByUserId({ userId }: { userId: string }): Promise<number> {
    const player = this.players.find((player) => player.id == userId);

    return player.count;
  }

  private fakeId(length): string {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
