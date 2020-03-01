module.exports = {
	setupFiles: ["<rootDir>/__tests__/setup.js"],
	setupFilesAfterEnv: ["<rootDir>/__tests__/setup-after-env.js"],
	testPathIgnorePatterns: [
		"setup.js",
		"setup-after-env.js",
		"test-utils.js",
		".ignore.test",
		"cypress/"
	],
	coveragePathIgnorePatterns: [
		"setup.js",
		"setup-after-env.js",
		"test-utils.js",
		".ignore.test",
		"cypress/"
	],
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
			statements: 50
		}
	},
	moduleNameMapper: {
		"\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
			"<rootDir>/__mocks__/file.js",
		"\\.(css|scss|less)$": "<rootDir>/__mocks__/style.js"
	}
};
