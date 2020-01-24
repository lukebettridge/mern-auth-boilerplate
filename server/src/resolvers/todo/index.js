const todoResolver = {
	Query: {
		todos: require("./todos.query")
	},
	Mutation: {
		addTodo: require("./addTodo.mutation"),
		removeTodo: require("./removeTodo.mutation"),
		updateTodo: require("./updateTodo.mutation")
	}
};

module.exports = todoResolver;
