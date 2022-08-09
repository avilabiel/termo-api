import LetterGuessResult from "./letter-guess-result";

type GameResult = {
  isGuessRight: boolean;
  letterGuessResults?: LetterGuessResult[];
};

export default GameResult;
