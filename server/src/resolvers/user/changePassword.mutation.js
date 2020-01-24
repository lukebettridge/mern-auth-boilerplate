const bcrypt = require("bcryptjs");

const { AuthorizationError, InputError } = require("../../errors");
const { passwordHash } = require("../../../utils");
const validate = require("../../../validation/reset-password");

module.exports = (parent, args, context) => {
	if (!context.user) throw new AuthorizationError();

	const { password, newPassword, newPassword2 } = args.input;
	return bcrypt.compare(password, context.user.password).then(isMatch => {
		if (isMatch) {
			const { errors, isValid } = validate({
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
};
