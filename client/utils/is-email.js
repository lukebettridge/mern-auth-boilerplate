const pattern = require("./pattern");

module.exports = email => {
	return pattern.email.test(email);
};
