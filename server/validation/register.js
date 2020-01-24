const Validator = require("validator");

module.exports = data => {
	const errors = {};

	data.forename = data.forename.replace(/^\s+|\s+$/g, "");
	data.surname = data.surname.replace(/^\s+|\s+$/g, "");
	data.email = data.email.replace(/^\s+|\s+$/g, "");
	data.password = data.password.replace(/^\s+|\s+$/g, "");
	data.password2 = data.password2.replace(/^\s+|\s+$/g, "");

	if (Validator.isEmpty(data.forename)) {
		errors.forename = "Forename field is required";
	}

	if (Validator.isEmpty(data.surname)) {
		errors.surname = "Surname field is required";
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	} else if (!Validator.isEmail(data.email)) {
		errors.email = "Email field is invalid";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	} else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password must be at least 6 characters";
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm password field is required";
	} else if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match";
	}

	return {
		errors,
		isValid: Object.entries(errors).length === 0
	};
};
