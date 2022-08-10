import express from "express";
import CheckPlayerWordGuess from "@/app/check-player-word-guess";
import ServiceLocator from "../classes/service-locator";

const app = express();

app.use(express.json());

app.post("/game-guess", async (req, res) => {
  try {
    const { word, userId } = req.body;

    const { playerRepository } = ServiceLocator.getServices();

    const gameResult = await CheckPlayerWordGuess.execute({
      word,
      userId,
      playerRepository,
    });

    res.json(gameResult);
  } catch (error: any) {
    // if (error instanceof PlayerError) {
    //   res.status(400).json({ message: error.message });
    // }

    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default app;
