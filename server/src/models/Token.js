const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
	{
		token: String
	},
	{ collection: "blacklist" }
);

module.exports = mongoose.model("Token", tokenSchema);
