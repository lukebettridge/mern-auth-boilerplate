const bcrypt = require("bcryptjs");

const { AuthorizationError, InputError } = require("server/src/errors");
const { passwordHash } = require("server/utils");
const validate = require("server/validation/reset-password");

const changePassword = require("server/src/resolvers/user/changePassword.mutation");

jest.mock("bcryptjs", () => ({
	compare: jest.fn(),
	then: jest.fn()
}));
jest.mock("server/src/errors", () => ({
	InputError: jest.fn()
}));
jest.mock("server/utils", () => ({
	passwordHash: jest.fn()
}));
jest.mock("server/validation/reset-password");

describe("change password mutation", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		bcrypt.compare.mockReturnValue(bcrypt);
		context.user.updateOne.mockReturnValue(context.user);
		validate.mockReturnValue({ errors: {}, isValid: true });
	});

	it("updates new password successfully", () => {
		changePassword(null, args, context);
		bcrypt.then.mock.calls[0][0](true);
		passwordHash.mock.calls[0][1](null, "hash");
		const output = context.user.then.mock.calls[0][0]();

		expect(bcrypt.compare).toHaveBeenCalledWith(
			"oldPassword123",
			"oldPassword123"
		);
		expect(bcrypt.then).toHaveBeenCalledWith(expect.any(Function));

		expect(validate).toHaveBeenCalledWith({
			newPassword: "newPassword123",
			newPassword2: "newPassword123"
		});
		expect(passwordHash).toHaveBeenCalledWith(
			"newPassword123",
			expect.any(Function)
		);

		expect(context.user.updateOne).toHaveBeenCalledWith({ password: "hash" });
		expect(context.user.then).toHaveBeenCalledWith(expect.any(Function));

		expect(output).toEqual("1");
	});

	it("does not match passwords", () => {
		changePassword(null, args, context);

		expect(() => {
			bcrypt.then.mock.calls[0][0](false);
		}).toThrow();
		expect(InputError).toHaveBeenCalledWith({
			errors: {
				password: "The password that you've entered is incorrect"
			}
		});
		expect(passwordHash).not.toHaveBeenCalled();
	});

	it("fails server-side validation", () => {
		validate.mockReturnValue({
			errors: { newPassword: "foo" },
			isValid: false
		});

		changePassword(null, args, context);

		expect(() => {
			bcrypt.then.mock.calls[0][0](true);
		}).toThrow();
		expect(InputError).toHaveBeenCalledWith({
			errors: {
				newPassword: "foo"
			}
		});
		expect(passwordHash).not.toHaveBeenCalled();
	});

	it("fails to hash the password", () => {
		changePassword(null, args, context);
		bcrypt.then.mock.calls[0][0](true);

		expect(() => {
			passwordHash.mock.calls[0][1]("error", "hash");
		}).toThrow("error");
	});

	it("prevent unauthorized roles", () => {
		expect(() => {
			changePassword(null, args, { user: null });
		}).toThrow(AuthorizationError);
	});

	const args = {
		input: {
			password: "oldPassword123",
			newPassword: "newPassword123",
			newPassword2: "newPassword123"
		}
	};

	const context = {
		user: {
			_id: "1",
			password: "oldPassword123",
			updateOne: jest.fn(),
			then: jest.fn()
		}
	};
});
