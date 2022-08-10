import PlayerRepositoryMemory from "@/externals/repositories/player-repository-memory";

type Service = { [key: string]: any };

export default class ServiceLocator {
  static getServices(): Service {
    return {
      playerRepository: new PlayerRepositoryMemory(),
    };
  }
}
