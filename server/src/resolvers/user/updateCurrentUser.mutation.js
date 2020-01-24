const { AuthorizationError, InputError } = require("../../errors");
const validate = require("../../../validation/update-user");
const User = require("../../models/User");

module.exports = (parent, args, context) => {
	if (!context.user) throw new AuthorizationError();

	const { forename, surname, email } = args.input;
	const { errors, isValid } = validate({
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
};
