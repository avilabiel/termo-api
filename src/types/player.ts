type Player = {
  id?: string;
  name: string;
  count: number;
  createdAt?: Date;
};

export default Player;

export interface PlayerRepository {
  create(player: Player): Promise<Player>;
  addGuessCountByUserId({ userId }: { userId: string }): Promise<void>;
  getGuessCountByUserId({ userId }: { userId: string }): Promise<number>;
}
