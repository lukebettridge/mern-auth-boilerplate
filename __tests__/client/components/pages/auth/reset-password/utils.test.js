import axios from "axios";

import { resetPassword } from "components/pages/auth/reset-password/utils";

jest.mock("axios", () => ({
	post: jest.fn(),
	then: jest.fn(),
	catch: jest.fn()
}));

const success = jest.fn();
const error = jest.fn();

describe("ResetPassword utility methods", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		axios.post.mockReturnValue(axios);
		axios.then.mockReturnValue(axios);
	});

	describe("resetPassword", () => {
		it("makes a post request", () => {
			resetPassword(
				{
					resetKey: "bar",
					newPassword: "password",
					newPassword2: "password"
				},
				success,
				error
			);

			expect(axios.post).toHaveBeenCalledWith("/api/auth/reset-password", {
				resetKey: "bar",
				newPassword: "password",
				newPassword2: "password"
			});
			expect(axios.then).toHaveBeenCalledWith(success);
			expect(axios.catch).toHaveBeenCalledWith(error);
		});
	});
});
