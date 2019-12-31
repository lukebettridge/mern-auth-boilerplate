const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = data => {
	const errors = {};

	data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
	data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : "";

	if (Validator.isEmpty(data.newPassword)) {
		errors.newPassword = "New password field is required";
	}

	if (Validator.isEmpty(data.newPassword2)) {
		errors.newPassword2 = "Confirm new password field is required";
	}

	if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
		errors.newPassword = "New password must be at least 6 characters";
	}

	if (!Validator.equals(data.newPassword, data.newPassword2)) {
		errors.newPassword2 = "Passwords must match";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
