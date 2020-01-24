/**
 * @jest-environment node
 */

const auth = require("server/routes/auth");
const register = require("server/routes/auth/register");
const login = require("server/routes/auth/login");
const resetPassword = require("server/routes/auth/reset-password");

describe("routes auth", () => {
	let router = {
		get: jest.fn(),
		post: jest.fn()
	};
	beforeEach(() => {
		jest.resetAllMocks();
	});
	it("defines authentication routes", () => {
		auth(router);

		expect(router.post).toHaveBeenCalledTimes(3);
		expect(router.post).toHaveBeenNthCalledWith(1, "/register", register);
		expect(router.post).toHaveBeenNthCalledWith(2, "/login", login);
		expect(router.post).toHaveBeenNthCalledWith(
			3,
			"/reset-password",
			resetPassword.post
		);

		expect(router.get).toHaveBeenCalledTimes(1);
		expect(router.get).toHaveBeenCalledWith(
			"/reset-password",
			resetPassword.get
		);
	});
});
