const { AuthorizationError } = require("../errors");
const validation = require("../../validation/update-user");
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
	},
	Mutation: {
		activateUser: (parent, args, context) => {
			if (!context.user || !context.user.roles.includes("admin"))
				throw new AuthorizationError();

			return User.findById(args.id).then(user =>
				user.update({ active: true }).then(() => true)
			);
		},
		deactivateUser: (parent, args, context) => {
			if (!context.user || !context.user.roles.includes("admin"))
				throw new AuthorizationError();

			if (context.user.id === args.id) throw new Error();

			return User.findById(args.id).then(user =>
				user.update({ active: false }).then(() => false)
			);
		},
		updateUser: (parent, args, context) => {
			if (!context.user || !context.user.roles.includes("admin"))
				throw new AuthorizationError();

			const { id, forename, surname, email } = args.input;
			const { isValid } = validation({ forename, surname, email });
			if (!isValid) throw new Error();

			return User.findById(id).then(user =>
				user.update({ forename, surname, email }).then(() => id)
			);
		}
	}
};

module.exports = userResolver;
