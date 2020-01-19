const { AuthorizationError } = require("../../errors");

const Todo = require("../../models/Todo");

module.exports = (parent, { text }, context) => {
	if (!context.user) throw new AuthorizationError();

	return Todo.create({ text, user: context.user._id }).then(todo => todo._id);
};
