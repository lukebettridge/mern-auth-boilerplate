const { AuthorizationError } = require("server/src/errors");
const Todo = require("server/src/models/Todo");

const todos = require("server/src/resolvers/todo/todos.query");

Todo.find = jest.fn();
Todo.then = jest.fn();

describe("todos query", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		Todo.find.mockReturnValue(Todo);
	});

	it("return results", () => {
		todos(null, {}, { user: { _id: "1" } });
		const output = Todo.then.mock.calls[0][0](results);

		expect(Todo.find).toHaveBeenCalledWith({ user: "1" });
		expect(Todo.then).toHaveBeenCalledWith(expect.any(Function));

		expect(output).toEqual(results);
	});

	it("return filtered results", () => {
		todos(null, { query: "bar" }, { user: { _id: "1" } });
		const output = Todo.then.mock.calls[0][0](results);

		expect(Todo.find).toHaveBeenCalledWith({ user: "1" });
		expect(Todo.then).toHaveBeenCalledWith(expect.any(Function));

		expect(output).toEqual([{ text: "bar" }]);
	});

	it("prevent unauthorized roles", () => {
		expect(() => {
			todos(null, {}, { user: null });
		}).toThrow(AuthorizationError);
	});

	const results = [{ text: "foo" }, { text: "bar" }];
});
