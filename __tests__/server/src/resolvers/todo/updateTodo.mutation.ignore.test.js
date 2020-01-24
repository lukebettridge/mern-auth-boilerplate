const { AuthorizationError } = require("server/src/errors");
const Todo = require("server/src/models/Todo");

const updateTodo = require("server/src/resolvers/todo/updateTodo.mutation");

Todo.findById = jest.fn();
Todo.then = jest.fn();

describe("update todo mutation", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		Todo.findById.mockReturnValue(Todo);
		todo.updateOne.mockReturnValue(todo);
	});

	it("updates a todo successfully", () => {
		updateTodo(null, { id: "0", text: "foo" }, { user: { _id: "1" } });
		Todo.then.mock.calls[0][0](todo);
		const output = todo.then.mock.calls[0][0]();

		expect(Todo.findById).toHaveBeenCalledWith("0");
		expect(Todo.then).toHaveBeenCalledWith(expect.any(Function));

		expect(todo.updateOne).toHaveBeenCalledWith({ text: "foo" });
		expect(todo.then).toHaveBeenCalledWith(expect.any(Function));

		expect(output).toEqual("0");
	});

	it("prevent current user updating another user's todo", () => {
		updateTodo(null, { id: "0", text: "foo" }, { user: { _id: "2" } });

		expect(() => {
			Todo.then.mock.calls[0][0](todo);
		}).toThrow(AuthorizationError);
	});

	it("prevent unauthorized roles", () => {
		expect(() => {
			updateTodo(null, { id: "0", text: "foo" }, { user: null });
		}).toThrow(AuthorizationError);
	});

	const todo = {
		user: "1",
		updateOne: jest.fn(),
		then: jest.fn()
	};
});
