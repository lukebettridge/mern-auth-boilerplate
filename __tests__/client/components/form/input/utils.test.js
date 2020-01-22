const { cloneDeep } = require("lodash");

const { validate } = require("components/form/input/utils");

describe("input utility methods", () => {
	describe("validate", () => {
		it("no validation", () => {
			const props = cloneDeep(baseProps);
			props.isRequired = false;
			props.value = "";

			const output = validate(props);

			expect(output).toEqual("");
		});

		it("entry is empty", () => {
			const props = cloneDeep(baseProps);
			props.value = "";

			const output = validate(props);

			expect(output).toEqual("Forename field is required");
		});

		it("entry with name is empty", () => {
			const props = cloneDeep(baseProps);
			props.friendlyName = "";
			props.name = "Forename";
			props.value = "";

			const output = validate(props);

			expect(output).toEqual("Forename field is required");
		});

		it("entry with no prefix is empty", () => {
			const props = cloneDeep(baseProps);
			props.friendlyName = "";
			props.value = "";

			const output = validate(props);

			expect(output).toEqual("This field is required");
		});

		it("entry is invalid", () => {
			const props = cloneDeep(baseProps);
			props.pattern = /^([^0-9]*)$/;
			props.value = "John1";

			const output = validate(props);

			expect(output).toEqual("Forename field is invalid");
		});

		it("entry is smaller than range", () => {
			const props = cloneDeep(baseProps);
			props.friendlyName = "Age";
			props.max = 100;
			props.min = 1;
			props.value = "0";

			const output = validate(props);

			expect(output).toEqual("Age must be between 1 and 100.");
		});

		it("entry is larger than range", () => {
			const props = cloneDeep(baseProps);
			props.friendlyName = "Age";
			props.max = 100;
			props.min = 1;
			props.value = "101";

			const output = validate(props);

			expect(output).toEqual("Age must be between 1 and 100.");
		});

		it("entry is too large", () => {
			const props = cloneDeep(baseProps);
			props.friendlyName = "Age";
			props.max = 100;
			props.value = "101";

			const output = validate(props);

			expect(output).toEqual("Age must be smaller than 100.");
		});

		it("entry is too small", () => {
			const props = cloneDeep(baseProps);
			props.friendlyName = "Age";
			props.min = 10;
			props.value = "9";

			const output = validate(props);

			expect(output).toEqual("Age must be larger than 10.");
		});

		it("entry length is small than range", () => {
			const props = cloneDeep(baseProps);
			props.friendlyName = "Password";
			props.max = "12";
			props.min = "6";
			props.value = "foo";

			const output = validate(props);

			expect(output).toEqual("Password must have a length between 6 and 12.");
		});

		it("entry length is larger than range", () => {
			const props = cloneDeep(baseProps);
			props.friendlyName = "Password";
			props.max = "12";
			props.min = "6";
			props.value = "foobarfoobarfoobar";

			const output = validate(props);

			expect(output).toEqual("Password must have a length between 6 and 12.");
		});

		it("entry length is too large", () => {
			const props = cloneDeep(baseProps);
			props.friendlyName = "Password";
			props.max = "12";
			props.value = "foobarfoobarfoobar";

			const output = validate(props);

			expect(output).toEqual("Password must have a length smaller than 12.");
		});

		it("entry length is too small", () => {
			const props = cloneDeep(baseProps);
			props.friendlyName = "Password";
			props.min = "6";
			props.value = "foo";

			const output = validate(props);

			expect(output).toEqual("Password must have a length larger than 6.");
		});

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
