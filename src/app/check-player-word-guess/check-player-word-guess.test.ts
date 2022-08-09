import CheckPlayerWordGuess from "./check-player-word-guess";

describe("CheckPlayerWordGuess", () => {
  it("works", async () => {
    const output = await CheckPlayerWordGuess();

    expect(output).toEqual("Hello");
  });
});
