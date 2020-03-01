import cloneDeep from "lodash/cloneDeep";

import { validate } from "components/form/input/utils";

describe("Input utility methods", () => {
	describe("validate", () => {
		[
			["no validation", { isRequired: false, value: "" }, ""],
			["entry is empty", { value: "" }, "Forename field is required"],
			[
				"entry with name is empty",
				{ friendlyName: "", name: "Forename", value: "" },
				"Forename field is required"
			],
			[
				"entry with no prefix is empty",
				{ friendlyName: "", value: "" },
				"This field is required"
			],
			[
				"entry is invalid",
				{ pattern: /^([^0-9]*)$/, value: "John1" },
				"Forename field is invalid"
			],
			["entry is valid", { pattern: /^([^0-9]*)$/, value: "John" }, ""],
			[
				"entry is empty but valid",
				{ isRequired: false, pattern: /^([^0-9]*)$/, value: "" },
				""
			],
			[
				"entry is smaller than range",
				{ friendlyName: "Age", max: 100, min: 1, value: "0" },
				"Age must be between 1 and 100."
			],
			[
				"entry is larger than range",
				{ friendlyName: "Age", max: 100, min: 1, value: "101" },
				"Age must be between 1 and 100."
			],
			[
				"entry is too large",
				{ friendlyName: "Age", max: 100, value: "101" },
				"Age must be smaller than 100."
			],
			[
				"entry is too small",
				{ friendlyName: "Age", min: 10, value: "9" },
				"Age must be larger than 10."
			],
			[
				"entry length is small than range",
				{ friendlyName: "Password", max: "12", min: "6", value: "foo" },
				"Password must have a length between 6 and 12."
			],
			[
				"entry length is larger than range",
				{
					friendlyName: "Password",
					max: "12",
					min: "6",
					value: "foobarfoobarfoobar"
				},
				"Password must have a length between 6 and 12."
			],
			[
				"entry length is larger than range",
				{
					friendlyName: "Password",
					max: "12",
					value: "foobarfoobarfoobar"
				},
				"Password must have a length smaller than 12."
			],
			[
				"entry length is too small",
				{ friendlyName: "Password", min: "6", value: "foo" },
				"Password must have a length larger than 6."
			]
		].map(([scenario, props, expected]) =>
			it(scenario, () => {
				props = Object.assign(cloneDeep(baseProps), { ...props });

				const output = validate(props);
				expect(output).toEqual(expected);
			})
		);

		const baseProps = {
			friendlyName: "Forename",
			isRequired: true,
			max: null,
			min: null,
			name: null,
			pattern: null,
			value: "John"
		};
	});
});
