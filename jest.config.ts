import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  moduleNameMapper: {
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1"
  },
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverage: false,
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"]
};

export default config;
