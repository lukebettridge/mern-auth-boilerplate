const validate = require("server/validation/update-user");

describe("update user validation", () => {
	[
		[
			"empty forename field",
			{ forename: "", surname: "Doe", email: "hello@example.com" },
			{ errors: { forename: "Forename field is required" }, isValid: false }
		],
		[
			"empty surname field",
			{ forename: "John", surname: "", email: "hello@example.com" },
			{ errors: { surname: "Surname field is required" }, isValid: false }
		],
		[
			"empty email address field",
			{ forename: "John", surname: "Doe", email: "" },
			{ errors: { email: "Email field is required" }, isValid: false }
		],
		[
			"invalid email address field",
			{ forename: "John", surname: "Doe", email: "foo" },
			{ errors: { email: "Email field is invalid" }, isValid: false }
		],
		[
			"valid entries",
			{ forename: "John", surname: "Doe", email: "hello@example.com" },
			{ errors: {}, isValid: true }
		]
	].map(([scenario, input, expected]) => {
		it(scenario, () => {
			const output = validate(input);
			expect(output).toEqual(expected);
		});
	});

	it("email to lowercase", () => {
		const input = {
			forename: "John",
			surname: "Doe",
			email: "HELLO@EXAMPLE.COM"
		};

		const output = validate(input);
		expect(output).toEqual({ errors: {}, isValid: true });
		expect(input.email).toEqual("hello@example.com");
	});
});
