const { AuthorizationError } = require("../../errors");

const Todo = require("../../models/Todo");

module.exports = (parent, args, context) => {
	if (!context.user) throw new AuthorizationError();

	const query = RegExp(`${args.query}.*`, "i");

	return Todo.find({ user: context.user._id }).then(todos =>
		args.query && args.query.length > 0
			? todos.filter(todo => todo.text.match(query))
			: todos
	);
};
