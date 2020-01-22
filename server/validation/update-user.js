const Validator = require("validator");

module.exports = data => {
	const errors = {};

	data.forename = data.forename.replace(/^\s+|\s+$/g, "");
	data.surname = data.surname.replace(/^\s+|\s+$/g, "");
	data.email = data.email.replace(/^\s+|\s+$/g, "");

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

	return {
		errors,
		isValid: Object.entries(errors).length === 0
	};
};
