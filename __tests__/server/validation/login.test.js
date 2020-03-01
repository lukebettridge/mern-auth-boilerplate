const validate = require("server/validation/login");

describe("login validation", () => {
	[
		[
			"empty email address",
			{ email: "", password: "password" },
			{ errors: { email: "Email field is required" }, isValid: false }
		],
		[
			"invalid email address",
			{ email: "foo", password: "password" },
			{ errors: { email: "Email field is invalid" }, isValid: false }
		],
		[
			"empty password",
			{ email: "hello@example.com", password: "" },
			{ errors: { password: "Password field is required" }, isValid: false }
		],
		[
			"empty email address and empty password",
			{ email: "", password: "" },
			{
				errors: {
					email: "Email field is required",
					password: "Password field is required"
				},
				isValid: false
			}
		],
		[
			"invalid email address and empty password",
			{ email: "foo", password: "" },
			{
				errors: {
					email: "Email field is invalid",
					password: "Password field is required"
				},
				isValid: false
			}
		],
		[
			"valid entries",
			{ email: "hello@example.com", password: "password" },
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
			email: "HELLO@EXAMPLE.COM",
			password: "password"
		};

		const output = validate(input);
		expect(output).toEqual({ errors: {}, isValid: true });
		expect(input.email).toEqual("hello@example.com");
	});
});
