const {
	AuthorizationError,
	GenericError,
	InputError
} = require("server/src/errors");
const validate = require("server/validation/update-user");
const User = require("server/src/models/User");

const updateUser = require("server/src/resolvers/user/updateUser.mutation");

jest.mock("server/src/errors", () => ({
	InputError: jest.fn()
}));
jest.mock("server/validation/update-user");

User.findById = jest.fn();
User.findOne = jest.fn();
User.then = jest.fn();

describe("update user mutation", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		validate.mockReturnValue({ errors: {}, isValid: true });
		User.findById.mockReturnValue(User);
		User.findOne.mockReturnValue(User);
		user1.updateOne.mockReturnValue(user1);
	});

	it("update user successfully", () => {
		updateUser(null, args, { user: { _id: "1", roles: ["admin"] } });
		User.then.mock.calls[0][0](user1);
		User.then.mock.calls[1][0](null);
		const output = user1.then.mock.calls[0][0]();

		expect(validate).toHaveBeenCalledWith({
			forename: "John",
			surname: "Doe",
			email: "hello@example.com"
		});
		expect(User.findById).toHaveBeenCalledWith("0");
		expect(User.then).toHaveBeenNthCalledWith(1, expect.any(Function));

		expect(User.findOne).toHaveBeenCalledWith({ email: "hello@example.com" });
		expect(User.then).toHaveBeenNthCalledWith(2, expect.any(Function));

		expect(user1.updateOne).toHaveBeenCalledWith({
			forename: "John",
			surname: "Doe",
			email: "hello@example.com",
			roles: ["user"]
		});
		expect(user1.then).toHaveBeenCalledWith(expect.any(Function));

		expect(output).toEqual("0");
	});

	it("prevents removing admin role from current user", () => {
		expect(() => {
			updateUser(null, args, { user: { _id: "0", roles: ["admin"] } });
		}).toThrow(GenericError);
	});

	it("fails server-side validation", () => {
		validate.mockReturnValueOnce({ errors: { email: "foo" }, isValid: false });

		expect(() => {
			updateUser(null, args, { user: { _id: "1", roles: ["admin"] } });
		}).toThrow();
		expect(InputError).toHaveBeenCalledWith({ errors: { email: "foo" } });
	});

	it("prevent updating to another account's email", () => {
		updateUser(null, args, { user: { _id: "1", roles: ["admin"] } });
		User.then.mock.calls[0][0](user1);

		expect(() => {
			User.then.mock.calls[1][0]({ _id: "2" });
		}).toThrow();
		expect(InputError).toHaveBeenCalledWith({
			errors: {
				email:
					"The email address that you've entered is associated with a different account"
			}
		});
	});

	it("prevent unauthorized roles", () => {
		expect(() => {
			updateUser(null, args, { user: { _id: "1", roles: ["user"] } });
		}).toThrow(AuthorizationError);
	});

	const args = {
		input: {
			id: "0",
			forename: "John",
			surname: "Doe",
			email: "hello@example.com",
			roles: ["user"]
		}
	};

	const user1 = {
		updateOne: jest.fn(),
		then: jest.fn()
	};
});
