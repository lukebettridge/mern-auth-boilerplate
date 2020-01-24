const { AuthorizationError, InputError } = require("server/src/errors");
const { passwordHash } = require("server/utils");
const validate = require("server/validation/register");
const User = require("server/src/models/User");

const addUser = require("server/src/resolvers/user/addUser.mutation");

jest.mock("server/src/errors", () => ({
	InputError: jest.fn()
}));
jest.mock("server/utils", () => ({
	passwordHash: jest.fn()
}));
jest.mock("server/validation/register");

User.create = jest.fn();
User.findOne = jest.fn();
User.then = jest.fn();

describe("add user mutation", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		validate.mockReturnValue({ errors: {}, isValid: true });
		User.create.mockReturnValue(User);
		User.findOne.mockReturnValue(User);
	});

	it("add a user successfully", () => {
		addUser(null, args, { user: { roles: ["admin"] } });
		User.then.mock.calls[0][0](null);
		passwordHash.mock.calls[0][1](null, "hash");
		const output = User.then.mock.calls[1][0]({ _id: "1" });

		expect(User.findOne).toHaveBeenCalledWith({ email: "hello@example.com" });
		expect(User.then).toHaveBeenNthCalledWith(1, expect.any(Function));

		expect(passwordHash).toHaveBeenCalledWith(
			"password123",
			expect.any(Function)
		);

		expect(User.create).toHaveBeenCalledWith({
			forename: "John",
			surname: "Doe",
			email: "hello@example.com",
			password: "hash",
			roles: ["user"]
		});
		expect(User.then).toHaveBeenNthCalledWith(2, expect.any(Function));

		expect(output).toEqual("1");
	});

	it("fails server-side validation", () => {
		validate.mockReturnValueOnce({
			errors: { email: "foo" },
			isValid: false
		});

		expect(() => {
			addUser(null, args, { user: { roles: ["admin"] } });
		}).toThrow();
		expect(InputError).toHaveBeenCalledWith({ errors: { email: "foo" } });
		expect(passwordHash).not.toHaveBeenCalled();
	});

	it("finds existing account", () => {
		addUser(null, args, { user: { roles: ["admin"] } });

		expect(() => {
			User.then.mock.calls[0][0]("user");
		}).toThrow();
		expect(InputError).toHaveBeenCalledWith({
			errors: {
				email:
					"The email address that you've entered is already associated with an account"
			}
		});
		expect(passwordHash).not.toHaveBeenCalled();
	});

	it("fails to hash the password", () => {
		addUser(null, args, { user: { roles: ["admin"] } });
		User.then.mock.calls[0][0](null);

		expect(() => {
			passwordHash.mock.calls[0][1]("error", "hash");
		}).toThrow("error");
	});

	it("prevent unauthorized roles", () => {
		expect(() => {
			addUser(null, args, { user: { roles: ["user"] } });
		}).toThrow(AuthorizationError);
	});

	const args = {
		input: {
			forename: "John",
			surname: "Doe",
			email: "hello@example.com",
			password: "password123",
			password2: "password123",
			roles: ["user"]
		}
	};
});
