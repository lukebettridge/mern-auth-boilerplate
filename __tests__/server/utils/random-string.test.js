const randomString = require("server/utils/random-string");

describe("random string utility", () => {
	[
		{
			len: undefined,
			date: undefined,
			scenario: "with default length and no date"
		},
		{
			len: 1,
			date: undefined,
			scenario: "with length of 1 and no date"
		},
		{
			len: 15,
			date: undefined,
			scenario: "with length of 15 and no date"
		},
		{
			len: 10,
			date: new Date(),
			scenario: "with length of 10 and today's date"
		}
	].map(({ len, date, scenario }) => {
		it(`generate ${scenario}`, () => {
			const output = randomString(len, date);

			const time = date ? date.getTime() : null;
			const length = time ? len + time.toString().length : len || 10;
			expect(output.length).toEqual(length);
			if (date) {
				expect(output).toContain(time.toString());
			}
		});
	});
});
