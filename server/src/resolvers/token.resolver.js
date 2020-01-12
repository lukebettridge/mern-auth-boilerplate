const { AuthenticationError } = require("apollo-server-express");

const Token = require("../models/Token");

const tokenResolver = {
	Mutation: {
		addToken: (parent, args, context) => {
			if (!context.token)
				throw new AuthenticationError(
					"Authentication token is invalid, please log in"
				);
			return Token.create({ token: context.token }).then(({ token }) => token);
		}
	}
};

module.exports = tokenResolver;
