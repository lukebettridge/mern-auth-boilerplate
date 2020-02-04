import axios from "axios";

import { register } from "components/pages/auth/register/utils";

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

describe("Register utility methods", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		axios.post.mockReturnValue(axios);
		axios.then.mockReturnValue(axios);
	});

	describe("register", () => {
		it("makes a post request", () => {
			register(
				{
					forename: "John",
					surname: "Doe",
					email: "hello@example.com",
					password: "password",
					password2: "password"
				},
				success,
				error
			);

			expect(axios.post).toHaveBeenCalledWith(
				"/api/auth/register",
				{
					forename: "John",
					surname: "Doe",
					email: "hello@example.com",
					password: "password",
					password2: "password"
				},
				{ baseURL: "foo" }
			);
			expect(axios.then).toHaveBeenCalledWith(success);
			expect(axios.catch).toHaveBeenCalledWith(error);
		});
	});
});
