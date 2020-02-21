const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	forename: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	roles: {
		type: [
			{
				type: String
			}
		],
		required: false,
		default: []
	},
	active: {
		type: Boolean,
		required: false
	},
	resetKey: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model("User", userSchema);
