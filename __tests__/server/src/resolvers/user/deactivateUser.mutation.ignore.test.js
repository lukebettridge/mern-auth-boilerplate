const { AuthorizationError, GenericError } = require("server/src/errors");
const User = require("server/src/models/User");

const deactivateUser = require("server/src/resolvers/user/deactivateUser.mutation");

User.findById = jest.fn();
User.then = jest.fn();

describe("deactivate user mutation", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		User.findById.mockReturnValue(User);
		user.updateOne.mockReturnValue(user);
	});

	it("deactivate a user successfully", () => {
		deactivateUser(null, { id: "1" }, { user: { _id: "0", roles: ["admin"] } });
		User.then.mock.calls[0][0](user);
		const output = user.then.mock.calls[0][0]();

		expect(User.findById).toHaveBeenCalledWith("1");
		expect(User.then).toHaveBeenCalledWith(expect.any(Function));

		expect(user.updateOne).toHaveBeenCalledWith({ active: false });
		expect(user.then).toHaveBeenCalledWith(expect.any(Function));

		expect(output).toEqual(false);
	});

	it("prevent deactivating current user", () => {
		expect(() => {
			deactivateUser(
				null,
				{ id: "0" },
				{ user: { _id: "0", roles: ["admin"] } }
			);
		}).toThrow(GenericError);
	});

	it("prevent unauthorized roles", () => {
		expect(() => {
			deactivateUser(null, { id: "1" }, { user: { roles: ["user"] } });
		}).toThrow(AuthorizationError);
	});

	const user = {
		updateOne: jest.fn(),
		then: jest.fn()
	};
});
