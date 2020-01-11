const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validate = require("../../validation/login");
const User = require("../../src/models/User");

module.exports = (req, res) => {
	const { errors, isValid } = validate(req.body);
	if (!isValid) return res.status(400).json(errors);

	const { email, password } = req.body;
	User.findOne({ email }).then(user => {
		if (!user)
			return res.status(404).json({
				email: "The email address that you've entered doesn't match any account"
			});

		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				if (!user.active)
					return res.status(400).json({
						error:
							"This user account has not been activated by an administrator"
					});
				jwt.sign(
					{
						id: user.id,
						email: user.email
					},
					process.env.SECRET_OR_KEY,
					{
						expiresIn: "1d"
					},
					(_, token) => {
						res.cookie("jwt", token, {
							httpOnly: true,
							secure: process.env.NODE_ENV === "production"
						});
						res.json({ success: true });
					}
				);
			} else
				return res
					.status(400)
					.json({ password: "The password that you've entered is incorrect" });
		});
	});
};
