const { AuthorizationError, InputError } = require("../../errors");
const { passwordHash } = require("../../../utils");
const validate = require("../../../validation/register");
const User = require("../../models/User");

module.exports = (parent, args, context) => {
	if (!context.user || !context.user.roles.includes("admin"))
		throw new AuthorizationError();

	const { forename, surname, email, password, password2, roles } = args.input;
	const { errors, isValid } = validate({
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
};
