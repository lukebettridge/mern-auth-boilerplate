const { AuthorizationError } = require("server/src/errors");
const User = require("server/src/models/User");

const activateUser = require("server/src/resolvers/user/activateUser.mutation");

User.findById = jest.fn();
User.then = jest.fn();

describe("activate user mutation", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		User.findById.mockReturnValue(User);
		user.updateOne.mockReturnValue(user);
	});

	it("activate a user successfully", () => {
		activateUser(null, { id: "1" }, { user: { roles: ["admin"] } });
		User.then.mock.calls[0][0](user);
		const output = user.then.mock.calls[0][0]();

		expect(User.findById).toHaveBeenCalledWith("1");
		expect(User.then).toHaveBeenCalledWith(expect.any(Function));

		expect(user.updateOne).toHaveBeenCalledWith({ active: true });
		expect(user.then).toHaveBeenCalledWith(expect.any(Function));

		expect(output).toEqual(true);
	});

	it("prevent unauthorized roles", () => {
		expect(() => {
			activateUser(null, { id: "1" }, { user: { roles: ["user"] } });
		}).toThrow(AuthorizationError);
	});

	const user = {
		updateOne: jest.fn(),
		then: jest.fn()
	};
});
