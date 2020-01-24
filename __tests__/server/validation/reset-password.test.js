const validate = require("server/validation/reset-password");

describe("reset password validation", () => {
	[
		[
			"empty password fields",
			{ newPassword: "", newPassword2: "" },
			{
				errors: {
					newPassword: "New password field is required",
					newPassword2: "Confirm new password field is required"
				},
				isValid: false
			}
		],
		[
			"invalid new password",
			{ newPassword: "foo", newPassword2: "foo" },
			{
				errors: { newPassword: "New password must be at least 6 characters" },
				isValid: false
			}
		],
		[
			"mismatching password fields",
			{ newPassword: "password", newPassword2: "password1" },
			{
				errors: { newPassword2: "Passwords must match" },
				isValid: false
			}
		],
		[
			"valid entries",
			{ newPassword: "password", newPassword2: "password" },
			{ errors: {}, isValid: true }
		]
	].map(([scenario, input, expected]) => {
		it(scenario, () => {
			const output = validate(input);
			expect(output).toEqual(expected);
		});
	});
});
