const { UserInputError } = require("apollo-server-express");

const { InputError } = require("server/src/errors");

jest.mock("apollo-server-express");

describe("server errors", () => {
	it("returns apollo user input error instance", () => {
		InputError({ error: "foo" });

		expect(UserInputError).toHaveBeenCalledWith("Invalid entry", {
			error: "foo"
		});
	});
});
