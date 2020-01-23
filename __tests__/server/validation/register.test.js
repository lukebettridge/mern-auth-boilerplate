const validate = require("server/validation/register");

describe("register validation", () => {
	[
		[
			"empty forename",
			{
				forename: "",
				surname: "Doe",
				email: "hello@example.com",
				password: "password",
				password2: "password"
			},
			{ errors: { forename: "Forename field is required" }, isValid: false }
		],
		[
			"empty surname",
			{
				forename: "John",
				surname: "",
				email: "hello@example.com",
				password: "password",
				password2: "password"
			},
			{ errors: { surname: "Surname field is required" }, isValid: false }
		],
		[
			"empty email address",
			{
				forename: "John",
				surname: "Doe",
				email: "",
				password: "password",
				password2: "password"
			},
			{ errors: { email: "Email field is required" }, isValid: false }
		],
		[
			"invalid email address",
			{
				forename: "John",
				surname: "Doe",
				email: "foo",
				password: "password",
				password2: "password"
			},
			{ errors: { email: "Email field is invalid" }, isValid: false }
		],
		[
			"empty passwords",
			{
				forename: "John",
				surname: "Doe",
				email: "hello@example.com",
				password: "",
				password2: ""
			},
			{
				errors: {
					password: "Password field is required",
					password2: "Confirm password field is required"
				},
				isValid: false
			}
		],
		[
			"invalid password length",
			{
				forename: "John",
				surname: "Doe",
				email: "hello@example.com",
				password: "foo",
				password2: "foo"
			},
			{
				errors: { password: "Password must be at least 6 characters" },
				isValid: false
			}
		],
		[
			"mismatching passwords",
			{
				forename: "John",
				surname: "Doe",
				email: "hello@example.com",
				password: "password",
				password2: "password1"
			},
			{
				errors: { password2: "Passwords must match" },
				isValid: false
			}
		],
		[
			"valid entries",
			{
				forename: "John",
				surname: "Doe",
				email: "hello@example.com",
				password: "password",
				password2: "password"
			},
			{ errors: {}, isValid: true }
		]
	].map(([scenario, input, expected]) => {
		it(scenario, () => {
			const output = validate(input);
			expect(output).toEqual(expected);
		});
	});
});
