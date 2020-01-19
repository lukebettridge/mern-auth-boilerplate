module.exports = {
	setupFiles: ["<rootDir>/__tests__/setup.js"],
	setupFilesAfterEnv: ["<rootDir>/__tests__/setup-after-env.js"],
	testPathIgnorePatterns: ["setup.js", "setup-after-env.js", ".ignore.test"],
	coveragePathIgnorePatterns: [
		"setup.js",
		"setup-after-env.js",
		".ignore.test"
	],
	coverageThreshold: {
		global: {
			branches: 50,
			functions: 50,
			lines: 50,
			statements: 50
		}
	},
	globals: {
		baseURL: ""
	}
};
