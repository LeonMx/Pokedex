module.exports = {
  "testEnvironment": "jsdom",
  "setupFilesAfterEnv": ["<rootDir>/setupTests.ts"],
  "testRegex": "((.+)/.*(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "testPathIgnorePatterns": ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
}