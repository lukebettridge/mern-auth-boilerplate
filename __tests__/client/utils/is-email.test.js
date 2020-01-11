const isEmail = require("client/utils/is-email");

describe("valid email addresses", () => {
	[
		{ email: "email@domain.com", scenario: "Valid email" },
		{
			email: "firstname.lastname@domain.com",
			scenario: "Email contains dot in the address field"
		},
		{
			email: "email@subdomain.domain.com",
			scenario: "Email contains dot with subdomain"
		},
		{
			email: "firstname+lastname@domain.com",
			scenario: "Plus sign is considered valid character"
		},
		{ email: "email@123.123.123.123", scenario: "Domain is valid IP address" },
		{
			email: "email@[123.123.123.123]",
			scenario: "Square bracket around IP address is considered valid"
		},
		{
			email: '"email"@domain.com',
			scenario: "Quotes around email is considered valid"
		},
		{ email: "1234567890@domain.com", scenario: "Digits in address are valid" },
		{ email: "email@domain-one.com", scenario: "Dash in domain name is valid" },
		{
			email: "_______@domain.com",
			scenario: "Underscore in the address field is valid"
		},
		{
			email: "email@domain.name",
			scenario: ".name is valid Top Level Domain name"
		},
		{
			email: "email@domain.co.jp",
			scenario: "Dot in Top Level Domain name also considered valid"
		},
		{
			email: "firstname-lastname@domain.com",
			scenario: "Dash in address field is valid"
		}
	].map(({ email, scenario }) => {
		test(scenario, () => {
			const output = isEmail(email);
			expect(output).toBe(true);
		});
	});
});

describe("invalid email addresses", () => {
	[
		{ email: "plainaddress", scenario: "Missing @ sign and domain" },
		{ email: "#@%^%#$@#$@#.com", scenario: "Garbage" },
		{ email: "@domain.com", scenario: "Missing username" },
		{
			email: "Joe Smith <email@domain.com>",
			scenario: "Encoded html within email is invalid"
		},
		{ email: "email.domain.com", scenario: "Missing @" },
		{ email: "email@domain@domain.com", scenario: "Two @ sign" },
		{
			email: ".email@domain.com",
			scenario: "Leading dot in address is not allowed"
		},
		{
			email: "email.@domain.com",
			scenario: "Trailing dot in address is not allowed"
		},
		{ email: "email..email@domain.com", scenario: "Multiple dots" },
		{
			email: "email@domain.com (Joe Smith)",
			scenario: "Text followed email is not allowed"
		},
		{
			email: "email@domain..com",
			scenario: "Multiple dot in the domain portion is invalid"
		}
	].map(({ email, scenario }) => {
		test(scenario, () => {
			const output = isEmail(email);
			expect(output).toBe(false);
		});
	});
});
