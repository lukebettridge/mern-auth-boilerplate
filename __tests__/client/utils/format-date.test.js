import formatDate from "client/utils/format-date";

describe("formatDate method", () => {
	[
		["0", "Thursday, January 1, 1970"],
		[0, "Thursday, January 1, 1970"],
		[new Date(0), "Thursday, January 1, 1970"],
		["", "Invalid Date"],
		[null, null],
		[undefined, null]
	].map(([input, expected]) =>
		it(`Expect input ${input} to return ${expected}`, () => {
			const output = formatDate(input);
			expect(output).toEqual(expected);
		})
	);
});
