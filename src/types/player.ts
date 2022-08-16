type Player = {
  id?: string;
  name: string;
  createdAt?: Date;
};

export default Player;

export interface PlayerRepository {
  create(player: Player): Promise<Player>;
  addGuessCountByUserId({ userId: string }): Promise<void>;
  getGuessCountByUserId({ userId: string }): Promise<number>;
}
