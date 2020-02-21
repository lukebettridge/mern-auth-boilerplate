import cloneDeep from "lodash/cloneDeep";

import { validate } from "components/form/select/utils";

describe("Select utility methods", () => {
	describe("validate", () => {
		[
			["no validation", { isRequired: false, value: "" }, ""],
			["entry is empty", { value: "" }, "Roles field is required"],
			[
				"entry is empty with whitespace",
				{ value: "   " },
				"Roles field is required"
			],
			[
				"entry with name is empty",
				{ friendlyName: "", name: "Roles", value: "" },
				"Roles field is required"
			],
			[
				"entry with no prefix is empty",
				{ friendlyName: "", value: "" },
				"This field is required"
			],
			[
				"multiple entry is empty",
				{ isMulti: true, value: [] },
				"Roles field is required"
			],
			["multiple entry is not empty", { isMulti: true, value: ["foo"] }, ""],
			[
				"object entry is empty",
				{ value: { value: "" } },
				"Roles field is required"
			],
			["object entry is not empty", { value: { value: "foo" } }, ""]
		].map(([scenario, props, expected]) =>
			it(scenario, () => {
				props = Object.assign(cloneDeep(baseProps), { ...props });

				const output = validate(props);
				expect(output).toEqual(expected);
			})
		);

		const baseProps = {
			friendlyName: "Roles",
			isMulti: false,
			isRequired: true,
			name: null,
			value: "foo"
		};
	});
});
