import Player, { PlayerRepository } from "@/types/player";
import Word from "@/types/word";
import GameResult from "@/types/game-result";
import LetterGuessResult from "@/types/letter-guess-result";
import LetterGuessStatus from "@/types/letter-guess-status";

const DAY_WORD = "gripe";
const MAX_GUESSES_PER_DAY = 6;

export default async ({
  word,
  player,
  playerRepository,
}: {
  word: Word;
  player: Player;
  playerRepository: PlayerRepository;
}): Promise<GameResult> => {
  await playerRepository.addGuessCountByUserId({ userId: player.id });

  const playerGuesses = await playerRepository.getGuessCountByUserId({
    userId: player.id,
  });

  if (playerGuesses > MAX_GUESSES_PER_DAY) {
    throw new Error("Player does not have more chances to guess");
  }

  if (word.toLowerCase() === DAY_WORD) {
    return {
      isGuessRight: true,
      letterGuessResults: [],
      remainingGuesses: MAX_GUESSES_PER_DAY - playerGuesses,
    };
  }

  const letterGuessResults = word
    .split("")
    .map((letter, position) => buildLetterGuessResult({ letter, position }));

  return {
    isGuessRight: true,
    letterGuessResults,
    remainingGuesses: MAX_GUESSES_PER_DAY - playerGuesses,
  };
};

/*
letter: string;
  status: LetterGuessStatus;
  position: number;

  LetterGuessStatus: POSITION_RIGHT,
  POSITION_WRONG,
  NOT_EXISTS,
*/

const buildLetterGuessResult = ({
  letter,
  position,
}: {
  letter: string;
  position: number;
}): LetterGuessResult => {
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
};
