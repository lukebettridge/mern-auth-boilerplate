const bcrypt = require("bcryptjs");

const { AuthorizationError, GenericError, InputError } = require("../errors");
const { passwordHash } = require("../../utils");
const validate = {
	addUser: require("../../validation/register"),
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
			return User.find()
				.sort({ active: -1 })
				.then(users =>
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
		addUser: (parent, args, context) => {
			if (!context.user || !context.user.roles.includes("admin"))
				throw new AuthorizationError();

			const {
				forename,
				surname,
				email,
				password,
				password2,
				roles
			} = args.input;
			const { errors, isValid } = validate.addUser({
				forename,
				surname,
				email,
				password,
				password2
			});
			if (!isValid) throw InputError({ errors });

			return User.findOne({ email }).then(user => {
				if (user)
					throw InputError({
						errors: {
							email:
								"The email address that you've entered is already associated with an account"
						}
					});
				passwordHash(password, (err, hash) => {
					if (err) throw err;
					return User.create({
						forename,
						surname,
						email,
						password: hash,
						roles
					}).then(newUser => newUser._id);
				});
			});
		},
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

			if (context.user._id.toString() === args.id.toString())
				throw new GenericError();

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
					if (!isValid) throw InputError({ errors });

					passwordHash(newPassword, (err, hash) => {
						if (err) throw err;
						return context.user
							.updateOne({ password: hash })
							.then(() => context.user._id);
					});
				} else
					throw InputError({
						errors: {
							password: "The password that you've entered is incorrect"
						}
					});
			});
		},
		updateCurrentUser: (parent, args, context) => {
			if (!context.user) throw new AuthorizationError();

			const { forename, surname, email } = args.input;
			const { errors, isValid } = validate.updateUser({
				forename,
				surname,
				email
			});
			if (!isValid) throw InputError({ errors });

			return User.findOne({ email }).then(user => {
				if (user && user._id.toString() !== context.user._id.toString())
					throw InputError({
						errors: {
							email:
								"The email address that you've entered is associated with a different account"
						}
					});
				return User.updateOne(
					{ _id: context.user._id },
					{ forename, surname, email }
				).then(user => user._id);
			});
		},
		updateUser: (parent, args, context) => {
			if (!context.user || !context.user.roles.includes("admin"))
				throw new AuthorizationError();

			const { id, forename, surname, email, roles } = args.input;

			if (
				context.user._id.toString() === id.toString() &&
				(!roles || !roles.includes("admin"))
			)
				throw new GenericError();

			const { errors, isValid } = validate.updateUser({
				forename,
				surname,
				email
			});
			if (!isValid) throw InputError({ errors });

			return User.findById(id).then(user1 =>
				User.findOne({ email }).then(user2 => {
					if (user2 && user2._id.toString() !== id.toString())
						throw InputError({
							errors: {
								email:
									"The email address that you've entered is associated with a different account"
							}
						});
					return user1
						.updateOne({ forename, surname, email, roles })
						.then(() => id);
				})
			);
		}
	}
};

module.exports = userResolver;
