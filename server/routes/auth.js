const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validate = {
	register: require("../validation/register"),
	login: require("../validation/login")
};
const User = require("../src/models/User");

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

		bcrypt.genSalt(10, (_, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser
					.save()
					.then(user => res.json(user))
					.catch(err => res.status(400).json(err));
			});
		});
	});
});

router.post("/login", (req, res) => {
	const { errors, isValid } = validate.login(req.body);
	if (!isValid) return res.status(400).json(errors);

	const email = req.body.email;
	const password = req.body.password;
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
							httpOnly: true
							//secure: true, //on HTTPS
							//domain: 'example.com', //set your domain
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

module.exports = router;
