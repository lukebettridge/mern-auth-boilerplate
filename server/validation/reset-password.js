const Validator = require("validator");

module.exports = data => {
	const errors = {};

	data.newPassword = data.newPassword.replace(/^\s+|\s+$/g, "");
	data.newPassword2 = data.newPassword2.replace(/^\s+|\s+$/g, "");

	if (Validator.isEmpty(data.newPassword)) {
		errors.newPassword = "New password field is required";
	} else if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
		errors.newPassword = "New password must be at least 6 characters";
	}

	if (Validator.isEmpty(data.newPassword2)) {
		errors.newPassword2 = "Confirm new password field is required";
	} else if (!Validator.equals(data.newPassword, data.newPassword2)) {
		errors.newPassword2 = "Passwords must match";
	}

	return {
		errors,
		isValid: Object.entries(errors).length === 0
	};
};
