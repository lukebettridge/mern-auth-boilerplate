/**
 * @jest-environment node
 */

describe("token resolver", () => {
	require("./addToken.mutation.ignore.test");

	it("registers correct methods", () => {
		const { Mutation } = require("server/src/resolvers/token");

		expect(Mutation.addToken).toEqual(
			require("server/src/resolvers/token/addToken.mutation")
		);
	});
});
