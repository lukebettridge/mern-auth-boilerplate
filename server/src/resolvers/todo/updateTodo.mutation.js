const { AuthorizationError } = require("../../errors");

const Todo = require("../../models/Todo");

module.exports = (parent, { id, text }, context) => {
	if (!context.user) throw new AuthorizationError();

	return Todo.findById(id).then(todo => {
		if (context.user._id.toString() !== todo.user.toString())
			throw new AuthorizationError();
		return todo.updateOne({ text }).then(() => id);
	});
};
