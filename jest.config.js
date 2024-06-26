module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "/test/.*\\.test\\.ts$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  collectCoverage: false,
  coverageDirectory: "coverage",
}
