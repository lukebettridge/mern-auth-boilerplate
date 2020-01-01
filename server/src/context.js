const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { AuthorizationError } = require("./errors");

const User = require("../src/models/User");

module.exports = ({ req }) => {
	const token = req.cookies["jwt"] || "";
	const authenticated = req.cookies["authenticated"] || "";
	try {
		if (authenticated !== "true") throw new AuthenticationError();

		const { id } = jwt.verify(token, process.env.SECRET_OR_KEY);
		return User.findById(id).then(user => {
			if (!user.active) throw new AuthorizationError();
			if (user) return { user };
		});
	} catch (e) {
		throw new AuthenticationError(
			"Authentication token is invalid, please log in"
		);
	}
};
