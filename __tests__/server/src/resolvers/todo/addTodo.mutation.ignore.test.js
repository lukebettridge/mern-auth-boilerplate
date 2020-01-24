const { AuthorizationError } = require("server/src/errors");
const Todo = require("server/src/models/Todo");

const addTodo = require("server/src/resolvers/todo/addTodo.mutation");

Todo.create = jest.fn();
Todo.then = jest.fn();

describe("add todo mutation", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		Todo.create.mockReturnValue(Todo);
	});

	it("add a todo successfully", () => {
		addTodo(null, { text: "foo" }, { user: { _id: "1" } });
		const output = Todo.then.mock.calls[0][0]({ _id: "0" });

		expect(Todo.create).toHaveBeenCalledWith({ text: "foo", user: "1" });
		expect(Todo.then).toHaveBeenCalledWith(expect.any(Function));

		expect(output).toEqual("0");
	});

	it("prevent unauthorized roles", () => {
		expect(() => {
			addTodo(null, { text: "foo" }, { user: null });
		}).toThrow(AuthorizationError);
	});
});
