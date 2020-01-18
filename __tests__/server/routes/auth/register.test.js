const { passwordHash } = require("server/utils");
const validate = require("server/validation/register");
const User = require("server/src/models/User");

const register = require("server/routes/auth/register");

jest.mock("server/utils", () => ({
	passwordHash: jest.fn()
}));
jest.mock("server/validation/register", () => jest.fn());
jest.mock("server/src/models/User", () => jest.fn());
User.findOne = jest.fn();
User.then = jest.fn();

const res = {
	json: jest.fn(),
	status: jest.fn()
};

describe("routes register", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		validate.mockReturnValue({ errors: {}, isValid: true });
		User.mockImplementation(function(user) {
			const returnValue = {
				...user,
				save: jest.fn(),
				then: jest.fn(),
				catch: jest.fn()
			};
			returnValue.save.mockReturnValue(returnValue);
			returnValue.then.mockReturnValue(returnValue);
			Object.assign(this, returnValue);
		});
		User.findOne.mockReturnValue(User);
		res.status.mockReturnValue(res);
	});

	it("register user successfully", () => {
		register(req, res);
		User.then.mock.calls[0][0](null);
		passwordHash.mock.calls[0][1](null, "hash");
		User.mock.instances[0].then.mock.calls[0][0]("user");

		expect(validate).toHaveBeenCalledWith(req.body);
		expect(User.findOne).toHaveBeenCalledWith({ email: "hello@example.com" });
		expect(User.then).toHaveBeenCalledWith(expect.any(Function));

		expect(User).toHaveBeenCalledWith({
			forename: "John",
			surname: "Doe",
			email: "hello@example.com",
			password: "password123"
		});
		expect(passwordHash).toHaveBeenCalledWith(
			"password123",
			expect.any(Function)
		);

		expect(User.mock.instances[0].forename).toEqual("John");
		expect(User.mock.instances[0].surname).toEqual("Doe");
		expect(User.mock.instances[0].email).toEqual("hello@example.com");
		expect(User.mock.instances[0].password).toEqual("hash");
		expect(User.mock.instances[0].save).toHaveBeenCalled();
		expect(User.mock.instances[0].then).toHaveBeenCalledWith(
			expect.any(Function)
		);
		expect(User.mock.instances[0].catch).toHaveBeenCalledWith(
			expect.any(Function)
		);

		expect(res.json).toHaveBeenCalledWith("user");
	});

	it("fails server-side validation", () => {
		validate.mockReturnValueOnce({ errors: { email: "foo" }, isValid: false });

		register(req, res);

		expect(validate).toHaveBeenCalledWith(req.body);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ email: "foo" });

		expect(User.findOne).not.toHaveBeenCalled();
	});

	it("finds existing account", () => {
		register(req, res);
		User.then.mock.calls[0][0]("user");

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			email:
				"The email address that you've entered is already associated with an account"
		});

		expect(passwordHash).not.toHaveBeenCalled();
	});

	it("fails to hash the password", () => {
		register(req, res);
		User.then.mock.calls[0][0](null);

		expect(() => {
			passwordHash.mock.calls[0][1]("error", "hash");
		}).toThrow("error");
		expect(User.mock.instances[0].save).not.toHaveBeenCalled();
	});

	it("fails to save the user", () => {
		register(req, res);
		User.then.mock.calls[0][0](null);
		passwordHash.mock.calls[0][1](null, "hash");
		User.mock.instances[0].catch.mock.calls[0][0]("error");

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith("error");
	});
});

const req = {
	body: {
		forename: "John",
		surname: "Doe",
		email: "hello@example.com",
		password: "password123"
	}
};
