import LetterGuessResult from "./letter-guess-result";

type GameResult = {
  isGuessRight: boolean;
  letterGuessResults?: LetterGuessResult[];
  remainingGuesses: number;
};

export default GameResult;
