const { AuthenticationError } = require("../../errors");

const Token = require("../../models/Token");

module.exports = (parent, args, context) => {
	if (!context.token)
		throw new AuthenticationError(
			"Authentication token is invalid, please log in"
		);
	return Token.create({ token: context.token }).then(({ token }) => token);
};
