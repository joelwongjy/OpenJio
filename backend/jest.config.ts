export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/migrations/",
    "/src/controllers/SeedController.ts",
  ],
};