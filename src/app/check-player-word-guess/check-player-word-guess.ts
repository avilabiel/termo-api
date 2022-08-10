import Player, { PlayerRepository } from "@/types/player";
import Word from "@/types/word";
import GameResult from "@/types/game-result";
import LetterGuessResult from "@/types/letter-guess-result";
import LetterGuessStatus from "@/types/letter-guess-status";

const DAY_WORD = "gripe";
const MAX_GUESSES_PER_DAY = 6;

export default class CheckPlayerWordGuess {
  static async execute({
    word,
    userId,
    playerRepository,
  }: {
    word: Word;
    userId: Player["id"];
    playerRepository: PlayerRepository;
  }): Promise<GameResult> {
    await playerRepository.addGuessCountByUserId({ userId });

    const playerGuesses = await playerRepository.getGuessCountByUserId({
      userId,
    });

    if (playerGuesses > MAX_GUESSES_PER_DAY) {
      throw new Error("Player does not have more chances to guess");
    }

    const didPlayerWin = word.toLowerCase() === DAY_WORD;

    if (didPlayerWin) {
      return this.buildPlayerWinGameResult({ playerGuesses });
    }

    return this.buildPlayerFailGameResult({ word, playerGuesses });
  }

  private static buildPlayerWinGameResult({
    playerGuesses,
  }: {
    playerGuesses: number;
  }): GameResult {
    return {
      isGuessRight: true,
      letterGuessResults: [],
      remainingGuesses: MAX_GUESSES_PER_DAY - playerGuesses,
    };
  }

  private static buildPlayerFailGameResult({
    word,
    playerGuesses,
  }: {
    word: Word;
    playerGuesses: number;
  }): GameResult {
    const letterGuessResults = word
      .split("")
      .map((letter, position) =>
        this.buildLetterGuessResult({ letter, position })
      );

    return {
      isGuessRight: false,
      letterGuessResults,
      remainingGuesses: MAX_GUESSES_PER_DAY - playerGuesses,
    };
  }

  private static buildLetterGuessResult({
    letter,
    position,
  }: {
    letter: string;
    position: number;
  }): LetterGuessResult {
    let status = LetterGuessStatus.NOT_EXISTS;

    if (DAY_WORD.includes(letter)) {
      status = LetterGuessStatus.POSITION_WRONG;
    }

    if (letter === DAY_WORD[position]) {
      status = LetterGuessStatus.POSITION_RIGHT;
    }

    return {
      letter,
      status,
      position,
    };
  }
}
