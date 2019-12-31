const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { mail, passwordHash, randomString } = require("../utils");

const validate = {
	register: require("../validation/register"),
	login: require("../validation/login"),
	resetPassword: require("../validation/reset-password")
};
const User = require("../src/models/User");
const RESET_KEY_STRING_LENGTH = 10;

const router = express.Router();

router.post("/register", (req, res) => {
	const { errors, isValid } = validate.register(req.body);
	if (!isValid) return res.status(400).json(errors);

	User.findOne({ email: req.body.email }).then(user => {
		if (user)
			return res.status(400).json({
				email:
					"The email address that you've entered is already associated with an account"
			});

		const newUser = new User({
			forename: req.body.forename,
			surname: req.body.surname,
			email: req.body.email,
			password: req.body.password
		});

		passwordHash(newUser.password, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			newUser
				.save()
				.then(user => res.json(user))
				.catch(err => res.status(400).json(err));
		});
	});
});

router.post("/login", (req, res) => {
	const { errors, isValid } = validate.login(req.body);
	if (!isValid) return res.status(400).json(errors);

	const { email, password } = req.body;
	User.findOne({ email }).then(user => {
		if (!user)
			return res.status(404).json({
				email: "The email address that you've entered doesn't match any account"
			});

		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
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
});

router.get("/reset-password", (req, res) => {
	const { email } = req.query;
	if (!email)
		return res.status(400).json({
			email: "Email field is required"
		});

	User.findOne({ email }).then(user => {
		if (!user)
			return res.status(404).json({
				email: "The email address that you've entered doesn't match any account"
			});

		const date = new Date();
		date.setDate(date.getDate() + process.env.EXPIRE_PASSWORD_RESET_DAYS || 1);
		const resetKey = randomString(RESET_KEY_STRING_LENGTH, date);
		user
			.update({ resetKey })
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
});

router.post("/reset-password", (req, res) => {
	const { errors, isValid } = validate.resetPassword(req.body);
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
				.update({ password: hash, resetKey: undefined })
				.then(() => res.json({ success: true }))
				.catch(err => res.status(400).json(err));
		});
	});
});

module.exports = router;
