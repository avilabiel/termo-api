module.exports = {
  rootDir: "./",
  roots: ["<rootDir>"],
  testEnvironment: "node",
  setupFiles: [],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  collectCoverage: true,
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  testTimeout: 30000,
};
