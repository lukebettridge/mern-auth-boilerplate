const notification = require("client/utils/notification");

describe("Notification method", () => {
	it("Returns an object", () => {
		const output = notification({});

		expect(output).toHaveProperty("ref");
		expect(output).toHaveProperty("success");
		expect(output.success).toBeInstanceOf(Function);
	});

	it("success calls ref", () => {
		const ref = {
			current: {
				addNotification: jest.fn()
			}
		};
		const output = notification(ref);

		const successSpy = jest.spyOn(output, "success");
		output.success("Test message");

		expect(output.ref).toEqual(ref);
		expect(successSpy).toHaveBeenCalledWith("Test message");
	});
});
