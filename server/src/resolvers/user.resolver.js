const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server-express");

const { AuthorizationError } = require("../errors");
const { passwordHash } = require("../../utils");
const validate = {
	changePassword: require("../../validation/reset-password"),
	updateUser: require("../../validation/update-user")
};
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
				user.updateOne({ active: true }).then(() => true)
			);
		},
		deactivateUser: (parent, args, context) => {
			if (!context.user || !context.user.roles.includes("admin"))
				throw new AuthorizationError();

			if (context.user.id === args.id) throw new Error();

			return User.findById(args.id).then(user =>
				user.updateOne({ active: false }).then(() => false)
			);
		},
		changePassword: (parent, args, context) => {
			if (!context.user) throw new AuthorizationError();

			const { password, newPassword, newPassword2 } = args.input;
			return bcrypt.compare(password, context.user.password).then(isMatch => {
				if (isMatch) {
					const { errors, isValid } = validate.changePassword({
						newPassword,
						newPassword2
					});
					if (!isValid) throw new UserInputError("Invalid entry", { errors });

					passwordHash(newPassword, (err, hash) => {
						if (err) throw err;
						return context.user
							.updateOne({ password: hash })
							.then(() => context.user.id);
					});
				} else throw new Error("The password that you've entered is incorrect");
			});
		},
		updateUser: (parent, args, context) => {
			if (!context.user || !context.user.roles.includes("admin"))
				throw new AuthorizationError();

			const { id, forename, surname, email } = args.input;
			const { errors, isValid } = validate.updateUser({
				forename,
				surname,
				email
			});
			if (!isValid) throw new UserInputError("Invalid entry", { errors });

			return User.findById(id).then(user =>
				user.updateOne({ forename, surname, email }).then(() => id)
			);
		}
	}
};

module.exports = userResolver;
