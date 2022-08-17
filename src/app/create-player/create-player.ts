import Player, { PlayerRepository } from "@/types/player";

export default class CreatePlayer {
  static async execute({
    player,
    playerRepository,
  }: {
    player: Player;
    playerRepository: PlayerRepository;
  }): Promise<Player> {
    const persistedPlayer = await playerRepository.create(player);

    return persistedPlayer;
  }
}
