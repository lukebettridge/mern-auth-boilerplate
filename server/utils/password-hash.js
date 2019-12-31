const bcrypt = require("bcryptjs");

module.exports = (str, callback = null) => {
	bcrypt.genSalt(10, (_, salt) => {
		bcrypt.hash(str, salt, callback);
	});
};
