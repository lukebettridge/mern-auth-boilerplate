const currentUser = require("server/src/resolvers/user/currentUser.query");

describe("current user query", () => {
	it("should return user from context", () => {
		const output = currentUser(null, null, { user: "user" });
		expect(output).toEqual("user");
	});
});
