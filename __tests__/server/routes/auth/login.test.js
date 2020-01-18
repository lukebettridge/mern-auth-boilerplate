const { cloneDeep } = require("lodash");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validate = require("server/validation/login");
const User = require("server/src/models/User");

const login = require("server/routes/auth/login");

jest.mock("bcryptjs", () => ({
	compare: jest.fn(),
	then: jest.fn()
}));
jest.mock("jsonwebtoken", () => ({
	sign: jest.fn()
}));
jest.mock("server/validation/login", () => jest.fn());
jest.mock("server/src/models/User", () => ({
	findOne: jest.fn(),
	then: jest.fn()
}));

const res = {
	cookie: jest.fn(),
	json: jest.fn(),
	status: jest.fn()
};

global.process.env = {
	NODE_ENV: "production",
	SECRET_OR_KEY: "secret"
};

describe("routes login", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		validate.mockReturnValue({ errors: {}, isValid: true });
		bcrypt.compare.mockReturnValue(bcrypt);
		User.findOne.mockReturnValue(User);
		res.status.mockReturnValue(res);
	});

	it("login user successfully", () => {
		login(req, res);
		User.then.mock.calls[0][0](baseUser);
		bcrypt.then.mock.calls[0][0](true);
		jwt.sign.mock.calls[0][3](null, "token");

		expect(validate).toHaveBeenCalledWith(req.body);
		expect(User.findOne).toHaveBeenCalledWith({ email: "hello@example.com" });
		expect(User.then).toHaveBeenCalledWith(expect.any(Function));

		expect(bcrypt.compare).toHaveBeenCalledWith("password123", "password123");
		expect(bcrypt.then).toHaveBeenCalledWith(expect.any(Function));

		expect(jwt.sign).toHaveBeenCalledWith(
			{
				id: "1",
				email: "hello@example.com"
			},
			"secret",
			{ expiresIn: "1d" },
			expect.any(Function)
		);

		expect(res.cookie).toHaveBeenCalledWith("jwt", "token", {
			httpOnly: true,
			secure: true
		});
		expect(res.json).toHaveBeenCalledWith({ success: true });
	});

	it("fails server-side validation", () => {
		validate.mockReturnValueOnce({ errors: { email: "foo" }, isValid: false });

		login(req, res);

		expect(validate).toHaveBeenCalledWith(req.body);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ email: "foo" });

		expect(User.findOne).not.toHaveBeenCalled();
	});

	it("does not find an account", () => {
		login(req, res);
		User.then.mock.calls[0][0](null);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			email: "The email address that you've entered doesn't match any account"
		});

		expect(bcrypt.compare).not.toHaveBeenCalled();
	});

	it("does not match passwords", () => {
		login(req, res);
		User.then.mock.calls[0][0](baseUser);
		bcrypt.then.mock.calls[0][0](false);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			password: "The password that you've entered is incorrect"
		});

		expect(jwt.sign).not.toHaveBeenCalled();
	});

	it("receives an inactive account", () => {
		const user = cloneDeep(baseUser);
		user.active = false;

		login(req, res);
		User.then.mock.calls[0][0](user);
		bcrypt.then.mock.calls[0][0](true);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			error: "This user account has not been activated by an administrator"
		});

		expect(jwt.sign).not.toHaveBeenCalled();
	});
});

const req = {
	body: { email: "hello@example.com", password: "password123" }
};
const baseUser = {
	id: "1",
	email: "hello@example.com",
	password: "password123",
	active: true
};
