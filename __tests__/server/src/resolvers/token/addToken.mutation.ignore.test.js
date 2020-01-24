const { AuthenticationError } = require("server/src/errors");
const Token = require("server/src/models/Token");

const addToken = require("server/src/resolvers/token/addToken.mutation");

Token.create = jest.fn();
Token.then = jest.fn();

describe("add token mutation", () => {
	beforeEach(() => {
		jest.resetAllMocks();

		Token.create.mockReturnValue(Token);
	});

	it("add a token successfully", () => {
		addToken(null, null, { token: "foo" });
		const output = Token.then.mock.calls[0][0]({ token: "foo" });

		expect(Token.create).toHaveBeenCalledWith({ token: "foo" });
		expect(Token.then).toHaveBeenCalledWith(expect.any(Function));

		expect(output).toEqual("foo");
	});

	it("prevent empty token", () => {
		expect(() => {
			addToken(null, null, {});
		}).toThrow(AuthenticationError);
	});
});
