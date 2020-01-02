const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = data => {
	const errors = {};

	data.forename = !isEmpty(data.forename) ? data.forename : "";
	data.surname = !isEmpty(data.surname) ? data.surname : "";
	data.email = !isEmpty(data.email) ? data.email : "";

	if (Validator.isEmpty(data.forename)) {
		errors.forename = "Forename field is required";
	}

	if (Validator.isEmpty(data.surname)) {
		errors.surname = "Surname field is required";
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	} else if (!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
