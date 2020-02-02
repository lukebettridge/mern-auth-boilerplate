import axios from "axios";

import { login } from "components/pages/auth/login/utils";

jest.mock("axios", () => ({
	post: jest.fn(),
	then: jest.fn(),
	catch: jest.fn()
}));

global.process.env = {
	BASE_URL: "foo"
};
const success = jest.fn();
const error = jest.fn();

describe("Login utility methods", () => {
	describe("login", () => {
		beforeEach(() => {
			jest.resetAllMocks();
			axios.post.mockReturnValue(axios);
			axios.then.mockReturnValue(axios);
		});

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
					baseURL: "foo",
					withCredentials: true
				}
			);
			expect(axios.then).toHaveBeenCalledWith(success);
			expect(axios.catch).toHaveBeenCalledWith(error);
		});
	});
});
