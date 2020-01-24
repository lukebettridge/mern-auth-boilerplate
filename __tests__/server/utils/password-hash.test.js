const bcrypt = require("bcryptjs");

const passwordHash = require("server/utils/password-hash");

jest.mock("bcryptjs", () => ({
	genSalt: jest.fn(),
	hash: jest.fn()
}));

const callback = jest.fn();

describe("password hash utility", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("returns hash in callback", () => {
		passwordHash("password", callback);
		bcrypt.genSalt.mock.calls[0][1](null, "salt");

		expect(bcrypt.genSalt).toHaveBeenCalledWith(10, expect.any(Function));

		expect(bcrypt.hash).toHaveBeenCalledWith("password", "salt", callback);
	});
});
