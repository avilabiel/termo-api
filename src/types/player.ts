type Player = {
  id: string;
  name: string;
};

export default Player;

export interface PlayerRepository {
  addGuessCountByUserId({ userId: string }): Promise<void>;
  getGuessCountByUserId({ userId: string }): Promise<number>;
}
