const { createError } = require("apollo-errors");

const AuthorizationError = createError("AuthorizationError", {
	message: "You are not authorized to access this information"
});

module.exports = {
	AuthorizationError
};
