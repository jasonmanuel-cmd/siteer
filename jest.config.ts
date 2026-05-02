import type { Config } from "jest";

const config: Config = {
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: { module: "commonjs" } }],
    },
    testMatch: ["**/__tests__/**/*.test.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    collectCoverageFrom: [
        "lib/scan/**/*.ts",
        "lib/rateLimit.ts",
    ],
};

export default config;
