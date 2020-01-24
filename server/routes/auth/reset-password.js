const { mail, passwordHash, randomString } = require("../../utils");
const validate = require("../../validation/reset-password");
const User = require("../../src/models/User");
const RESET_KEY_STRING_LENGTH = 10;

module.exports = {
	get: (req, res) => {
		const { email } = req.query;
		if (!email)
			return res.status(400).json({
				email: "Email field is required"
			});

		User.findOne({ email }).then(user => {
			if (!user)
				return res.status(404).json({
					email:
						"The email address that you've entered doesn't match any account"
				});

			const date = new Date();
			date.setDate(
				date.getDate() + process.env.EXPIRE_PASSWORD_RESET_DAYS || 1
			);
			const resetKey = randomString(RESET_KEY_STRING_LENGTH, date);
			user
				.updateOne({ resetKey })
				.then(() => {
					const url = `${process.env.BASE_URL}/auth/reset-password/${resetKey}`;
					mail({
						to: email,
						subject: `${process.env.APP_NAME} - Your password reset request`,
						text: `Hello ${user.forename},

So, you've forgotten your password... no biggie, follow this link to set a new one: ${url}

Thanks,
The ${process.env.APP_NAME} Team`
					})
						.then(() => {
							res.json({ success: true });
						})
						.catch(err => res.status(400).json(err));
				})
				.catch(err => res.status(400).json(err));
		});
	},
	post: (req, res) => {
		const { errors, isValid } = validate(req.body);
		if (!isValid) return res.status(400).json(errors);

		const { newPassword, resetKey } = req.body;
		if (!resetKey)
			return res.status(400).json({
				resetKey: "No reset key was specified"
			});

		User.findOne({ resetKey }).then(user => {
			if (!user)
				return res.status(404).json({
					resetKey: "The reset key given doesn't match any account"
				});

			const milliseconds = Number(resetKey.substr(RESET_KEY_STRING_LENGTH));
			const date = new Date(milliseconds);
			if (new Date() > date)
				return res.status(400).json({
					resetKey: "The reset key given has expired"
				});

			passwordHash(newPassword, (err, hash) => {
				if (err) throw err;
				user
					.updateOne({ password: hash, resetKey: undefined })
					.then(() => res.json({ success: true }))
					.catch(err => res.status(400).json(err));
			});
		});
	}
};
