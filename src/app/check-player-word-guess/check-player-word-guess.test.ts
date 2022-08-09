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
  it("returns a valid game result when player still have chances to guess", async () => {
    const word: Word = "teste";
    const player: Player = { id: "token-1234-token", name: "Testevaldo" };

    const output = await CheckPlayerWordGuess.execute({
      word,
      player,
      playerRepository: new MockPlayerRepository(),
    });

    expect(output).toStrictEqual({
      isGuessRight: false,
      letterGuessResults: [
        {
          letter: "t",
          position: 0,
          status: "NOT_EXISTS",
        },
        {
          letter: "e",
          position: 1,
          status: "POSITION_WRONG",
        },
        {
          letter: "s",
          position: 2,
          status: "NOT_EXISTS",
        },
        {
          letter: "t",
          position: 3,
          status: "NOT_EXISTS",
        },
        {
          letter: "e",
          position: 4,
          status: "POSITION_RIGHT",
        },
      ],
      remainingGuesses: 5,
    });
  });

  it("returns a valid game result when player win", async () => {
    const word: Word = "gripe";
    const player: Player = { id: "token-1234-token", name: "Testevaldo" };

    const output = await CheckPlayerWordGuess.execute({
      word,
      player,
      playerRepository: new MockPlayerRepository(),
    });

    expect(output).toStrictEqual({
      isGuessRight: true,
      letterGuessResults: [],
      remainingGuesses: 5,
    });
  });

  it("returns game result when player guesses right in the 3rd guess", async () => {
    const firstWord: Word = "teste";
    const secondWord: Word = "aldos";
    const thirdWord: Word = "gripe";

    const player: Player = { id: "token-1234-token", name: "Testevaldo" };

    const mockPlayerRepository = new MockPlayerRepository();

    const firstGuess = await CheckPlayerWordGuess.execute({
      word: firstWord,
      player,
      playerRepository: mockPlayerRepository,
    });

    const secondGuess = await CheckPlayerWordGuess.execute({
      word: secondWord,
      player,
      playerRepository: mockPlayerRepository,
    });

    const thirdGuess = await CheckPlayerWordGuess.execute({
      word: thirdWord,
      player,
      playerRepository: mockPlayerRepository,
    });

    expect(firstGuess).toStrictEqual({
      isGuessRight: false,
      letterGuessResults: [
        {
          letter: "t",
          position: 0,
          status: "NOT_EXISTS",
        },
        {
          letter: "e",
          position: 1,
          status: "POSITION_WRONG",
        },
        {
          letter: "s",
          position: 2,
          status: "NOT_EXISTS",
        },
        {
          letter: "t",
          position: 3,
          status: "NOT_EXISTS",
        },
        {
          letter: "e",
          position: 4,
          status: "POSITION_RIGHT",
        },
      ],
      remainingGuesses: 5,
    });
    expect(secondGuess).toStrictEqual({
      isGuessRight: false,
      letterGuessResults: [
        {
          letter: "a",
          position: 0,
          status: "NOT_EXISTS",
        },
        {
          letter: "l",
          position: 1,
          status: "NOT_EXISTS",
        },
        {
          letter: "d",
          position: 2,
          status: "NOT_EXISTS",
        },
        {
          letter: "o",
          position: 3,
          status: "NOT_EXISTS",
        },
        {
          letter: "s",
          position: 4,
          status: "NOT_EXISTS",
        },
      ],
      remainingGuesses: 4,
    });
    expect(thirdGuess).toStrictEqual({
      isGuessRight: true,
      letterGuessResults: [],
      remainingGuesses: 3,
    });
  });

  it("throws an error when player does not have more chances for guesses", async () => {
    try {
      const player: Player = { id: "token-1234-token", name: "Testevaldo" };

      const mockPlayerRepository = new MockPlayerRepository();

      await CheckPlayerWordGuess.execute({
        word: "test1",
        player,
        playerRepository: mockPlayerRepository,
      });

      await CheckPlayerWordGuess.execute({
        word: "test2",
        player,
        playerRepository: mockPlayerRepository,
      });

      await CheckPlayerWordGuess.execute({
        word: "test3",
        player,
        playerRepository: mockPlayerRepository,
      });

      await CheckPlayerWordGuess.execute({
        word: "test4",
        player,
        playerRepository: mockPlayerRepository,
      });

      await CheckPlayerWordGuess.execute({
        word: "test5",
        player,
        playerRepository: mockPlayerRepository,
      });

      await CheckPlayerWordGuess.execute({
        word: "test6",
        player,
        playerRepository: mockPlayerRepository,
      });

      await CheckPlayerWordGuess.execute({
        word: "gripe",
        player,
        playerRepository: mockPlayerRepository,
      });
    } catch (error: any) {
      expect(error.message).toEqual(
        "Player does not have more chances to guess"
      );
    }
  });
});
