const {
	AuthorizationError,
	GenericError,
	InputError
} = require("../../errors");
const validate = require("../../../validation/update-user");
const User = require("../../models/User");

module.exports = (parent, args, context) => {
	if (!context.user || !context.user.roles.includes("admin"))
		throw new AuthorizationError();

	const { id, forename, surname, email, roles } = args.input;

	if (
		context.user._id.toString() === id.toString() &&
		(!roles || !roles.includes("admin"))
	)
		throw new GenericError();

	const { errors, isValid } = validate({
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
};
