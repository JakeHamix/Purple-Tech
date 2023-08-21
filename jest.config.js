/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/server/**/*.test.(js|ts)', // Adjust the folder and file extension as needed
  ],
  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    // "mjs",
    // "cjs",
    // "jsx",
    'ts',
    // "tsx",
    // "json",
    // "node"
  ],
};
