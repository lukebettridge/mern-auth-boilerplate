const { createError } = require("apollo-errors");
const { UserInputError } = require("apollo-server-express");

const AuthorizationError = createError("AuthorizationError", {
	message: "You are not authorized to access this information"
});

const GenericError = createError("GenericError", {
	message: "Something has gone wrong"
});

const InputError = args => new UserInputError("Invalid entry", args);

module.exports = {
	AuthorizationError,
	GenericError,
	InputError
};
