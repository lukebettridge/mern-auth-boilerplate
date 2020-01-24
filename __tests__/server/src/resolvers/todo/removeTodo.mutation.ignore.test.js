const { AuthorizationError } = require("server/src/errors");
const Todo = require("server/src/models/Todo");

const removeTodo = require("server/src/resolvers/todo/removeTodo.mutation");

Todo.findById = jest.fn();
Todo.then = jest.fn();

describe("remove todo mutation", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		Todo.findById.mockReturnValue(Todo);
		todo.remove.mockReturnValue(todo);
	});

	it("removes a todo successfully", () => {
		removeTodo(null, { id: "0" }, { user: { _id: "1" } });
		Todo.then.mock.calls[0][0](todo);
		const output = todo.then.mock.calls[0][0]();

		expect(Todo.findById).toHaveBeenCalledWith("0");
		expect(Todo.then).toHaveBeenCalledWith(expect.any(Function));

		expect(todo.remove).toHaveBeenCalled();
		expect(todo.then).toHaveBeenCalledWith(expect.any(Function));

		expect(output).toEqual("0");
	});

	it("prevent current user removing another user's todo", () => {
		removeTodo(null, { id: "0" }, { user: { _id: "2" } });

		expect(() => {
			Todo.then.mock.calls[0][0](todo);
		}).toThrow(AuthorizationError);
	});

	it("prevent unauthorized roles", () => {
		expect(() => {
			removeTodo(null, { id: "0" }, { user: null });
		}).toThrow(AuthorizationError);
	});

	const todo = {
		_id: "0",
		user: "1",
		remove: jest.fn(),
		then: jest.fn()
	};
});
