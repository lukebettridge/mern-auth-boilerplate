const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

module.exports = ({ req }) => {
	const token = req.cookies["jwt"] || "";
	const authenticated = req.cookies["authenticated"] || "";
	try {
		if (authenticated !== "true") throw new AuthenticationError();
		const { id, email } = jwt.verify(token, process.env.SECRET_OR_KEY);
		return { id, email };
	} catch (e) {
		throw new AuthenticationError(
			"Authentication token is invalid, please log in"
		);
	}
};
