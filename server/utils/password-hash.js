const bcrypt = require("bcryptjs");

module.exports = (str, callback) => {
	bcrypt.genSalt(10, (_, salt) => {
		bcrypt.hash(str, salt, callback);
	});
};
