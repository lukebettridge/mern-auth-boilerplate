const pattern = require("./pattern");

module.exports = email => pattern.email.test(email);
