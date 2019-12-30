const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
	text: String
});

module.exports = mongoose.model('Todo', todoSchema);
