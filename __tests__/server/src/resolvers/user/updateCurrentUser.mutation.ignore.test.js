const { AuthorizationError, InputError } = require("server/src/errors");
const validate = require("server/validation/update-user");
const User = require("server/src/models/User");

const updateCurrentUser = require("server/src/resolvers/user/updateCurrentUser.mutation");

jest.mock("server/src/errors", () => ({
	InputError: jest.fn()
}));
jest.mock("server/validation/update-user");

User.findOne = jest.fn();
User.updateOne = jest.fn();
User.then = jest.fn();

describe("update current user mutation", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		validate.mockReturnValue({ errors: {}, isValid: true });
		User.findOne.mockReturnValue(User);
		User.updateOne.mockReturnValue(User);
	});

	it("update current user successfully", () => {
		updateCurrentUser(null, args, { user: { _id: "1" } });
		User.then.mock.calls[0][0]();
		User.then.mock.calls[1][0]({ _id: "1" });

		expect(User.findOne).toHaveBeenCalledWith({ email: "hello@example.com" });
		expect(User.then).toHaveBeenNthCalledWith(1, expect.any(Function));

		expect(User.updateOne).toHaveBeenCalledWith(
			{ _id: "1" },
			{ forename: "John", surname: "Doe", email: "hello@example.com" }
		);
		expect(User.then).toHaveBeenNthCalledWith(2, expect.any(Function));
	});

	it("fails server-side validation", () => {
		validate.mockReturnValueOnce({ errors: { email: "foo" }, isValid: false });

		expect(() => {
			updateCurrentUser(null, args, { user: { _id: "1" } });
		}).toThrow();
		expect(InputError).toHaveBeenCalledWith({ errors: { email: "foo" } });
	});

	it("prevent updating to another account's email", () => {
		updateCurrentUser(null, args, { user: { _id: "1" } });

		expect(() => {
			User.then.mock.calls[0][0]({ _id: "0" });
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
			updateCurrentUser(null, args, { user: null });
		}).toThrow(AuthorizationError);
	});

	const args = {
		input: {
			forename: "John",
			surname: "Doe",
			email: "hello@example.com"
		}
	};
});
