const { AuthorizationError } = require("server/src/errors");
const User = require("server/src/models/User");

const users = require("server/src/resolvers/user/users.query");

User.find = jest.fn();
User.sort = jest.fn();
User.then = jest.fn();

describe("users query", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		User.find.mockReturnValue(User);
		User.sort.mockReturnValue(User);
	});

	it("return results", () => {
		users(null, { query: "" }, { user: { roles: ["admin"] } });
		const output = User.then.mock.calls[0][0]([{ forename: "John" }]);

		expect(User.find).toHaveBeenCalled();
		expect(User.sort).toHaveBeenCalledWith({ active: -1 });
		expect(User.then).toHaveBeenCalledWith(expect.any(Function));
		expect(output).toEqual([{ forename: "John" }]);
	});

	it("return filtered results", () => {
		const results = [
			{ forename: "John", surname: "Doe", email: "john@example.com" },
			{ forename: "Jane", surname: "Doe", email: "jane@example.com" }
		];

		users(null, { query: "John" }, { user: { roles: ["admin"] } });
		const output = User.then.mock.calls[0][0](results);

		expect(output).toEqual([
			{ forename: "John", surname: "Doe", email: "john@example.com" }
		]);
	});

	it("prevent unauthorized roles", () => {
		expect(() => {
			users(null, { query: "" }, { user: { roles: ["user"] } });
		}).toThrow(AuthorizationError);
	});
});
