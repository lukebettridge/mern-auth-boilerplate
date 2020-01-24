const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { AuthorizationError } = require("./errors");

const Token = require("../src/models/Token");
const User = require("../src/models/User");

module.exports = ({ req }) => {
	const token = req.cookies["jwt"] || "";
	try {
		return Token.findOne({ token }).then(expiredToken => {
			if (expiredToken)
				throw new AuthenticationError(
					"Authentication token is invalid, please log in"
				);

			const { id } = jwt.verify(token, process.env.SECRET_OR_KEY);
			return User.findById(id).then(user => {
				if (!user.active) throw new AuthorizationError();
				if (user) return { user, token };
			});
		});
	} catch (e) {
		throw new AuthenticationError(
			"Authentication token is invalid, please log in"
		);
	}
};
