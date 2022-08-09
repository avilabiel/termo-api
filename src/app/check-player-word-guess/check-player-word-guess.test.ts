import Player, { PlayerRepository } from "@/types/player";
import Word from "@/types/word";
import CheckPlayerWordGuess from "./check-player-word-guess";

class MockPlayerRepository implements PlayerRepository {
  count: number = 0;

  async addGuessCountByUserId({
    userId: string,
  }: {
    userId: any;
  }): Promise<void> {
    this.count++;
    return;
  }

  async getGuessCountByUserId({
    userId: string,
  }: {
    userId: any;
  }): Promise<number> {
    return this.count;
  }
}

describe("CheckPlayerWordGuess", () => {
  it("works", async () => {
    const word: Word = "teste";
    const player: Player = { id: "token-1234-token", name: "Testevaldo" };

    const output = await CheckPlayerWordGuess({
      word,
      player,
      playerRepository: new MockPlayerRepository(),
    });

    console.log({ output });

    expect(output).toEqual("Hello");
  });
});
