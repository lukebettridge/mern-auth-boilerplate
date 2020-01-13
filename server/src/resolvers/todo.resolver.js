const { AuthorizationError } = require("../errors");

const Todo = require("../models/Todo");

const todoResolver = {
	Query: {
		todos: (parent, args, context) => {
			if (!context.user) throw new AuthorizationError();

			const query = RegExp(`${args.query}.*`, "i");

			return Todo.find({ user: context.user._id }).then(todos =>
				args.query && args.query.length > 0
					? todos.filter(todo => todo.text.match(query))
					: todos
			);
		}
	},
	Mutation: {
		addTodo: (parent, { text }, context) => {
			if (!context.user) throw new AuthorizationError();

			return Todo.create({ text, user: context.user._id }).then(
				todo => todo.id
			);
		},
		removeTodo: (parent, { id }, context) => {
			if (!context.user) throw new AuthorizationError();

			return Todo.findById(id).then(todo => {
				if (context.user._id.toString() !== todo.user.toString())
					throw new AuthorizationError();
				return todo.remove().then(() => todo.id);
			});
		},
		updateTodo: (parent, { id, text }, context) => {
			if (!context.user) throw new AuthorizationError();

			return Todo.findById(id).then(todo => {
				if (context.user._id.toString() !== todo.user.toString())
					throw new AuthorizationError();
				return todo.updateOne({ text }).then(() => id);
			});
		}
	}
};

module.exports = todoResolver;
