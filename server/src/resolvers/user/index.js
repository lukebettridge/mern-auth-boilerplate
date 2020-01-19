const userResolver = {
	Query: {
		currentUser: require("./currentUser.query"),
		users: require("./users.query")
	},
	Mutation: {
		addUser: require("./addUser.mutation"),
		activateUser: require("./activateUser.mutation"),
		deactivateUser: require("./deactivateUser.mutation"),
		changePassword: require("./changePassword.mutation"),
		updateCurrentUser: require("./updateCurrentUser.mutation"),
		updateUser: require("./updateUser.mutation")
	}
};

module.exports = userResolver;
