describe("user resolver", () => {
	require("./currentUser.query.ignore.test");
	require("./users.query.ignore.test");
	require("./addUser.mutation.ignore.test");
	require("./activateUser.mutation.ignore.test");
	require("./deactivateUser.mutation.ignore.test");
	require("./changePassword.mutation.ignore.test");
	require("./updateCurrentUser.mutation.ignore.test");
	require("./updateUser.mutation.ignore.test");

	it("registers correct methods", () => {
		const { Query, Mutation } = require("server/src/resolvers/user");

		expect(Query.currentUser).toEqual(
			require("server/src/resolvers/user/currentUser.query")
		);
		expect(Query.users).toEqual(
			require("server/src/resolvers/user/users.query")
		);
		expect(Mutation.addUser).toEqual(
			require("server/src/resolvers/user/addUser.mutation")
		);
		expect(Mutation.activateUser).toEqual(
			require("server/src/resolvers/user/activateUser.mutation")
		);
		expect(Mutation.deactivateUser).toEqual(
			require("server/src/resolvers/user/deactivateUser.mutation")
		);
		expect(Mutation.changePassword).toEqual(
			require("server/src/resolvers/user/changePassword.mutation")
		);
		expect(Mutation.updateCurrentUser).toEqual(
			require("server/src/resolvers/user/updateCurrentUser.mutation")
		);
		expect(Mutation.updateUser).toEqual(
			require("server/src/resolvers/user/updateUser.mutation")
		);
	});
});
