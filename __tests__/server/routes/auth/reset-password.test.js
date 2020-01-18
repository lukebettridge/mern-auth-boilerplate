const { cloneDeep } = require("lodash");

const { mail, passwordHash, randomString } = require("server/utils");
const validate = require("server/validation/reset-password");
const User = require("server/src/models/User");

const resetPassword = require("server/routes/auth/reset-password");

jest.mock("server/utils", () => ({
	mail: jest.fn(),
	passwordHash: jest.fn(),
	randomString: jest.fn()
}));
mail.then = jest.fn();
mail.catch = jest.fn();
jest.mock("server/validation/reset-password", () => jest.fn());
jest.mock("server/src/models/User", () => jest.fn());
User.findOne = jest.fn();
User.then = jest.fn();

const res = {
	json: jest.fn(),
	status: jest.fn()
};

const oldDate = new Date(0);
const newDate = new Date(1);

global.process.env = {
	APP_NAME: "app",
	BASE_URL: "http://example.com"
};

describe("routes reset password (get)", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		mail.mockReturnValue(mail);
		mail.then.mockReturnValue(mail);
		randomString.mockReturnValue("random-string");
		User.findOne.mockReturnValue(User);
		res.status.mockReturnValue(res);
		baseUser.updateOne.mockReturnValue(baseUser);
		baseUser.then.mockReturnValue(baseUser);
	});

	it("request password reset successfully", () => {
		resetPassword.get(req, res);
		User.then.mock.calls[0][0](baseUser);
		baseUser.then.mock.calls[0][0]();
		mail.then.mock.calls[0][0]();

		expect(User.findOne).toHaveBeenCalledWith({ email: "hello@example.com" });
		expect(User.then).toHaveBeenCalledWith(expect.any(Function));

		expect(randomString).toHaveBeenCalledWith(10, expect.any(Date));
		expect(baseUser.updateOne).toBeCalledWith({ resetKey: "random-string" });
		expect(baseUser.then).toHaveBeenCalledWith(expect.any(Function));
		expect(baseUser.catch).toHaveBeenCalledWith(expect.any(Function));

		expect(mail).toHaveBeenCalledWith({
			to: "hello@example.com",
			subject: "app - Your password reset request",
			text: `Hello John,

So, you've forgotten your password... no biggie, follow this link to set a new one: http://example.com/auth/reset-password/random-string

Thanks,
The app Team`
		});
		expect(mail.then).toHaveBeenCalledWith(expect.any(Function));
		expect(mail.catch).toHaveBeenCalledWith(expect.any(Function));

		expect(res.json).toHaveBeenCalledWith({ success: true });
	});

	it("does not receive email as parameter", () => {
		resetPassword.get({ query: {} }, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			email: "Email field is required"
		});

		expect(User.findOne).not.toHaveBeenCalled();
	});

	it("does not find an account", () => {
		resetPassword.get(req, res);
		User.then.mock.calls[0][0](null);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			email: "The email address that you've entered doesn't match any account"
		});

		expect(randomString).not.toHaveBeenCalled();
	});

	it("fails to send email", () => {
		resetPassword.get(req, res);
		User.then.mock.calls[0][0](baseUser);
		baseUser.then.mock.calls[0][0]();
		mail.catch.mock.calls[0][0]("error");

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith("error");
	});

	it("fails to update user", () => {
		resetPassword.get(req, res);
		User.then.mock.calls[0][0](baseUser);
		baseUser.catch.mock.calls[0][0]("error");

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith("error");
	});

	const req = {
		query: {
			email: "hello@example.com"
		}
	};
});

describe("routes reset password (post)", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		validate.mockReturnValue({ errors: {}, isValid: true });
		User.findOne.mockReturnValue(User);
		res.status.mockReturnValue(res);
		baseUser.updateOne.mockReturnValue(baseUser);
		baseUser.then.mockReturnValue(baseUser);

		global.Date = jest.fn(num => (num === 0 ? oldDate : newDate));
	});

	it("updates new password successfully", () => {
		resetPassword.post(req, res);
		User.then.mock.calls[0][0](baseUser);
		passwordHash.mock.calls[0][1](null, "hash");
		baseUser.then.mock.calls[0][0]();

		expect(validate).toHaveBeenCalledWith(req.body);
		expect(User.findOne).toHaveBeenCalledWith({
			resetKey: "abcdefghij1"
		});
		expect(User.then).toHaveBeenCalledWith(expect.any(Function));

		expect(passwordHash).toHaveBeenCalledWith(
			"password123",
			expect.any(Function)
		);

		expect(baseUser.updateOne).toHaveBeenCalledWith({
			password: "hash",
			resetKey: undefined
		});
		expect(baseUser.then).toHaveBeenCalledWith(expect.any(Function));
		expect(baseUser.catch).toHaveBeenCalledWith(expect.any(Function));

		expect(res.json).toHaveBeenCalledWith({ success: true });
	});

	it("fails server-side validation", () => {
		validate.mockReturnValueOnce({
			errors: { newPassword: "foo" },
			isValid: false
		});

		resetPassword.post(req, res);

		expect(validate).toHaveBeenCalledWith(req.body);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ newPassword: "foo" });

		expect(User.findOne).not.toHaveBeenCalled();
	});

	it("does not receive reset key", () => {
		resetPassword.post({ body: { newPassword: "password123" } }, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			resetKey: "No reset key was specified"
		});

		expect(User.findOne).not.toHaveBeenCalled();
	});

	it("does not find an account", () => {
		resetPassword.post(req, res);
		User.then.mock.calls[0][0](null);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			resetKey: "The reset key given doesn't match any account"
		});

		expect(passwordHash).not.toHaveBeenCalled();
	});

	it("receives an expired reset key", () => {
		const invalidReq = cloneDeep(req);
		invalidReq.body.resetKey = "abcdefghij0";

		resetPassword.post(invalidReq, res);
		User.then.mock.calls[0][0](baseUser);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			resetKey: "The reset key given has expired"
		});
	});

	it("fails to hash the password", () => {
		resetPassword.post(req, res);
		User.then.mock.calls[0][0](baseUser);

		expect(() => {
			passwordHash.mock.calls[0][1]("error", "hash");
		}).toThrow("error");
		expect(baseUser.updateOne).not.toHaveBeenCalled();
	});

	it("fails to update user", () => {
		resetPassword.post(req, res);
		User.then.mock.calls[0][0](baseUser);
		passwordHash.mock.calls[0][1](null, "hash");
		baseUser.catch.mock.calls[0][0]("error");

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith("error");
	});

	const req = {
		body: {
			newPassword: "password123",
			resetKey: "abcdefghij1"
		}
	};
});

const baseUser = {
	updateOne: jest.fn(),
	then: jest.fn(),
	catch: jest.fn(),
	forename: "John"
};
