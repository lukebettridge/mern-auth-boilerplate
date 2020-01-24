const notification = require("client/utils/notification");

describe("Notification method", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("Returns an object", () => {
		const output = notification({});

		expect(output).toHaveProperty("ref");
		expect(output).toHaveProperty("success");
		expect(output.success).toBeInstanceOf(Function);
	});

	it("success calls ref with message", () => {
		const output = notification(ref);

		output.success("foo");

		expect(output.ref).toEqual(ref);
		expect(ref.current.addNotification).toHaveBeenCalledWith({
			message: "foo",
			title: "Success",
			level: "success",
			position: "bl"
		});
	});

	it("success calls ref without message", () => {
		const output = notification(ref);

		output.success();

		expect(output.ref).toEqual(ref);
		expect(ref.current.addNotification).toHaveBeenCalledWith({
			message: "",
			title: "Success",
			level: "success",
			position: "bl"
		});
	});
});

const ref = {
	current: {
		addNotification: jest.fn()
	}
};
