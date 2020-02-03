import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import { MemoryRouter, useHistory } from "react-router-dom";

import { Link } from "components/styles";
import { Error } from "components/form/input/styles";
import * as utils from "components/pages/auth/login/utils";
import ResetPasswordModal from "components/pages/auth/login/ResetPasswordModal";

import Login from "components/pages/auth/login";

let wrapper;
let subject;
const history = { push: jest.fn() };
const formEvent = { preventDefault: jest.fn() };
jest.mock("components/pages/auth/login/utils", () => ({
	login: jest.fn()
}));
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useHistory: jest.fn()
}));

describe("Login component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		useHistory.mockReturnValue(history);
	});

	afterEach(() => {
		if (wrapper) wrapper.unmount();
	});

	it("snapshot renders", async () => {
		mountWrapper();
		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("prevents submission of invalid form", () => {
		mountWrapper();

		subject.find("form").simulate("submit", formEvent);

		expect(formEvent.preventDefault).toHaveBeenCalled();
		expect(utils.login).not.toHaveBeenCalled();
	});

	it("allows submission of valid form", () => {
		mountWrapper();
		populateForm();

		subject.find("form").simulate("submit", formEvent);
		utils.login.mock.calls[0][1]();

		expect(formEvent.preventDefault).toHaveBeenCalled();
		expect(utils.login).toHaveBeenCalledWith(
			{
				email: "hello@example.com",
				password: "password"
			},
			expect.any(Function),
			expect.any(Function)
		);

		expect(history.push).toHaveBeenCalledWith("/home");
	});

	it("catch error with response", () => {
		mountWrapper();
		populateForm();

		subject.find("form").simulate("submit", formEvent);
		act(() => {
			utils.login.mock.calls[0][2]({ response: { data: { error: "foo" } } });
		});
		updateSubject();

		expect(formEvent.preventDefault).toHaveBeenCalled();

		expect(subject.find(Error).length).toEqual(1);
		expect(subject.find(Error).text()).toEqual("foo");
	});

	it("catch error without response", () => {
		mountWrapper();
		populateForm();

		subject.find("form").simulate("submit", formEvent);
		act(() => {
			utils.login.mock.calls[0][2]({ response: null });
		});
		updateSubject();

		expect(formEvent.preventDefault).toHaveBeenCalled();

		expect(subject.find(Error).length).toEqual(0);
	});

	it("opens the reset password modal", () => {
		mountWrapper();

		clickResetPasswordLink();

		expect(subject.find(ResetPasswordModal).props().isOpen).toEqual(true);
	});

	it("closes the reset password modal", () => {
		mountWrapper();
		clickResetPasswordLink();

		act(() => {
			subject
				.find(ResetPasswordModal)
				.props()
				.close();
		});
		updateSubject();

		expect(subject.find(ResetPasswordModal).props().isOpen).toEqual(false);
	});
});

const mountWrapper = () => {
	wrapper = mount(
		<MemoryRouter>
			<Login />
		</MemoryRouter>
	);
	subject = wrapper.find(Login);
};

const updateSubject = () => {
	wrapper.update();
	subject = wrapper.find(Login);
};

const populateForm = (email = "hello@example.com", password = "password") => {
	subject
		.find("input")
		.at(0)
		.simulate("change", {
			target: { name: "email", value: email }
		});
	subject
		.find("input")
		.at(1)
		.simulate("change", {
			target: { name: "password", value: password }
		});
	updateSubject();
};

const clickResetPasswordLink = () => {
	subject.find(Link).simulate("click");
	updateSubject();
};
