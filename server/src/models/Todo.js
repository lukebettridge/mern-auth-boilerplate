const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const todoSchema = Schema({
	text: String,
	user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Todo", todoSchema);
