import PlayerRepositoryPrismaMySQL from "@/externals/repositories/player-repository-prisma-mysql";
import CreatePlayer from "./create-player";

describe("CreatePlayer", () => {
  it("creates a new player", async () => {
    const player = { name: "Testevaldo Ávila" };

    const persistedPlayer = await CreatePlayer.execute({
      player,
      playerRepository: new PlayerRepositoryPrismaMySQL(),
    });

    expect(persistedPlayer.id).toBeDefined();
    expect(persistedPlayer.createdAt).toBeDefined();
  });
});
