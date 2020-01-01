const { AuthorizationError } = require("../errors");
const User = require("../models/User");

const userResolver = {
	Query: {
		currentUser: (parent, args, context) => context.user,
		users: (parent, args, context) => {
			if (!context.user || !context.user.roles.includes("admin"))
				throw new AuthorizationError();

			const query = RegExp(`${args.query}.*`, "i");
			return User.find().then(users =>
				args.query && args.query.length > 0
					? users.filter(
							user =>
								user.forename.match(query) ||
								user.surname.match(query) ||
								user.email.match(query)
					  )
					: users
			);
		}
	}
};

module.exports = userResolver;
