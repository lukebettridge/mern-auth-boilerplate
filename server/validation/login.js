const Validator = require("validator");

module.exports = data => {
	const errors = {};

	data.email = data.email.replace(/^\s+|\s+$/g, "").toLowerCase();
	data.password = data.password.replace(/^\s+|\s+$/g, "");

	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	} else if (!Validator.isEmail(data.email)) {
		errors.email = "Email field is invalid";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	return {
		errors,
		isValid: Object.entries(errors).length === 0
	};
};
