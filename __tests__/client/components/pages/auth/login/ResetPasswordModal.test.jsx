import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";

import { Error } from "components/form/input/styles";
import * as utils from "components/pages/auth/login/utils";

import ResetPasswordModal from "components/pages/auth/login/ResetPasswordModal";

let subject;
const formEvent = { preventDefault: jest.fn() };
jest.mock("components/pages/auth/login/utils", () => ({
	resetPassword: jest.fn()
}));

describe("ResetPasswordModal component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		if (subject) subject.unmount();
	});

	it("snapshot renders", async () => {
		subject = mount(<ResetPasswordModal {...baseProps} />);
		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("prevents submission of invalid form", () => {
		subject = mount(<ResetPasswordModal {...baseProps} />);

		subject.find("form").simulate("submit", formEvent);

		expect(formEvent.preventDefault).toHaveBeenCalled();
		expect(utils.resetPassword).not.toHaveBeenCalled();
	});

	it("allows submission of valid form", () => {
		subject = mount(<ResetPasswordModal {...baseProps} />);
		populateForm();

		subject.find("form").simulate("submit", formEvent);

		act(() => {
			utils.resetPassword.mock.calls[0][1]();
		});
		subject.update();

		expect(formEvent.preventDefault).toHaveBeenCalled();
		expect(utils.resetPassword).toHaveBeenCalledWith(
			"hello@example.com",
			expect.any(Function),
			expect.any(Function)
		);

		expect(baseProps.close).toHaveBeenCalled();
	});

	it("catch error with response", () => {
		subject = mount(<ResetPasswordModal {...baseProps} />);
		populateForm();

		subject.find("form").simulate("submit", formEvent);
		act(() => {
			utils.resetPassword.mock.calls[0][2]({
				response: { data: { error: "foo" } }
			});
		});
		subject.update();

		expect(formEvent.preventDefault).toHaveBeenCalled();

		expect(subject.find(Error).length).toEqual(1);
		expect(subject.find(Error).text()).toEqual("foo");
	});

	it("catch error without response", () => {
		subject = mount(<ResetPasswordModal {...baseProps} />);
		populateForm();

		subject.find("form").simulate("submit", formEvent);
		act(() => {
			utils.resetPassword.mock.calls[0][2]({ response: null });
		});
		subject.update();

		expect(formEvent.preventDefault).toHaveBeenCalled();

		expect(subject.find(Error).length).toEqual(0);
	});
});

const populateForm = (email = "hello@example.com") => {
	subject
		.find("input")
		.at(0)
		.simulate("change", {
			target: { name: "email", value: email }
		});
};

const baseProps = {
	close: jest.fn(),
	isOpen: true
};
