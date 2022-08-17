import PlayerRepositoryPrismaMySQL from "@/externals/repositories/player-repository-prisma-mysql";
import PlayerRepositoryMemory from "@/externals/repositories/player-repository-memory";
import Word from "@/types/word";
import CreatePlayer from "../create-player/create-player";
import CheckPlayerWordGuess from "./check-player-word-guess";

describe("CheckPlayerWordGuess", () => {
  it("returns a valid game result when player still have chances to guess", async () => {
    const word: Word = "teste";

    const persistedPlayer = await CreatePlayer.execute({
      player: {
        name: "Testevaldo",
        count: 0,
      },
      playerRepository: new PlayerRepositoryPrismaMySQL(),
    });

    const output = await CheckPlayerWordGuess.execute({
      word,
      userId: persistedPlayer.id,
      playerRepository: new PlayerRepositoryPrismaMySQL(),
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

    const persistedPlayer = await CreatePlayer.execute({
      player: {
        name: "Testevaldo",
        count: 0,
      },
      playerRepository: new PlayerRepositoryPrismaMySQL(),
    });

    const output = await CheckPlayerWordGuess.execute({
      word,
      userId: persistedPlayer.id,
      playerRepository: new PlayerRepositoryPrismaMySQL(),
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

    const persistedPlayer = await CreatePlayer.execute({
      player: {
        name: "Testevaldo",
        count: 0,
      },
      playerRepository: new PlayerRepositoryPrismaMySQL(),
    });

    const firstGuess = await CheckPlayerWordGuess.execute({
      word: firstWord,
      userId: persistedPlayer.id,
      playerRepository: new PlayerRepositoryPrismaMySQL(),
    });

    const secondGuess = await CheckPlayerWordGuess.execute({
      word: secondWord,
      userId: persistedPlayer.id,
      playerRepository: new PlayerRepositoryPrismaMySQL(),
    });

    const thirdGuess = await CheckPlayerWordGuess.execute({
      word: thirdWord,
      userId: persistedPlayer.id,
      playerRepository: new PlayerRepositoryPrismaMySQL(),
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
      const persistedPlayer = await CreatePlayer.execute({
        player: {
          name: "Testevaldo",
          count: 0,
        },
        playerRepository: new PlayerRepositoryPrismaMySQL(),
      });

      await CheckPlayerWordGuess.execute({
        word: "test1",
        userId: persistedPlayer.id,
        playerRepository: new PlayerRepositoryPrismaMySQL(),
      });

      await CheckPlayerWordGuess.execute({
        word: "test2",
        userId: persistedPlayer.id,
        playerRepository: new PlayerRepositoryPrismaMySQL(),
      });

      await CheckPlayerWordGuess.execute({
        word: "test3",
        userId: persistedPlayer.id,
        playerRepository: new PlayerRepositoryPrismaMySQL(),
      });

      await CheckPlayerWordGuess.execute({
        word: "test4",
        userId: persistedPlayer.id,
        playerRepository: new PlayerRepositoryPrismaMySQL(),
      });

      await CheckPlayerWordGuess.execute({
        word: "test5",
        userId: persistedPlayer.id,
        playerRepository: new PlayerRepositoryPrismaMySQL(),
      });

      await CheckPlayerWordGuess.execute({
        word: "test6",
        userId: persistedPlayer.id,
        playerRepository: new PlayerRepositoryPrismaMySQL(),
      });

      await CheckPlayerWordGuess.execute({
        word: "gripe",
        userId: persistedPlayer.id,
        playerRepository: new PlayerRepositoryPrismaMySQL(),
      });
    } catch (error: any) {
      expect(error.message).toEqual(
        "Player does not have more chances to guess"
      );
    }
  });
});
