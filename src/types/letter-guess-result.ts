import LetterGuessStatus from "./letter-guess-status";

type LetterGuessResult = {
  letter: string;
  status: LetterGuessStatus;
  position: number;
};

export default LetterGuessResult;
