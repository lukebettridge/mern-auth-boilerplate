const Todo = require("../models/Todo");

const todoResolver = {
	Query: {
		todos() {
			return Todo.find();
		}
	},
	Mutation: {
		addTodo(_, args) {
			const todo = new Todo(args);
			todo.save();
			return todo;
		},
		removeTodo(_, { id }) {
			Todo.findByIdAndRemove(id).exec();
		}
	}
};

module.exports = todoResolver;
