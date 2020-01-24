const { passwordHash } = require("../../utils");
const validate = require("../../validation/register");
const User = require("../../src/models/User");

module.exports = (req, res) => {
	const { errors, isValid } = validate(req.body);
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
};
