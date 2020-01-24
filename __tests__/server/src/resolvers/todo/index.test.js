/**
 * @jest-environment node
 */

describe("todo resolver", () => {
	require("./todos.query.ignore.test");
	require("./addTodo.mutation.ignore.test");
	require("./removeTodo.mutation.ignore.test");
	require("./updateTodo.mutation.ignore.test");

	it("registers correct methods", () => {
		const { Query, Mutation } = require("server/src/resolvers/todo");

		expect(Query.todos).toEqual(
			require("server/src/resolvers/todo/todos.query")
		);
		expect(Mutation.addTodo).toEqual(
			require("server/src/resolvers/todo/addTodo.mutation")
		);
		expect(Mutation.removeTodo).toEqual(
			require("server/src/resolvers/todo/removeTodo.mutation")
		);
		expect(Mutation.updateTodo).toEqual(
			require("server/src/resolvers/todo/updateTodo.mutation")
		);
	});
});
