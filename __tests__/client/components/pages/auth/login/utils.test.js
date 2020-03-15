import axios from "axios";

import { login, resetPassword } from "components/pages/auth/login/utils";

jest.mock("axios", () => ({
	get: jest.fn(),
	post: jest.fn(),
	then: jest.fn(),
	catch: jest.fn()
}));

const success = jest.fn();
const error = jest.fn();

describe("Login utility methods", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		axios.get.mockReturnValue(axios);
		axios.post.mockReturnValue(axios);
		axios.then.mockReturnValue(axios);
	});

	describe("login", () => {
		it("makes a post request", () => {
			login(
				{ email: "hello@example.com", password: "password" },
				success,
				error
			);

			expect(axios.post).toHaveBeenCalledWith(
				"/api/auth/login",
				{ email: "hello@example.com", password: "password" },
				{
					withCredentials: true
				}
			);
			expect(axios.then).toHaveBeenCalledWith(success);
			expect(axios.catch).toHaveBeenCalledWith(error);
		});
	});

	describe("resetPassword", () => {
		it("makes a get request", () => {
			resetPassword("hello@example.com", success, error);

			expect(axios.get).toHaveBeenCalledWith(
				"/api/auth/reset-password?email=hello@example.com",
				{
					withCredentials: true
				}
			);
			expect(axios.then).toHaveBeenCalledWith(success);
			expect(axios.catch).toHaveBeenCalledWith(error);
		});
	});
});
