import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import { MemoryRouter } from "react-router-dom";

import { Error } from "components/form/input/styles";
import * as utils from "components/pages/auth/reset-password/utils";

import ResetPassword from "components/pages/auth/reset-password";

let wrapper;
let subject;
const formEvent = { preventDefault: jest.fn() };
jest.mock("components/pages/auth/reset-password/utils", () => ({
	resetPassword: jest.fn()
}));

describe("ResetPassword component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
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
		expect(utils.resetPassword).not.toHaveBeenCalled();
	});

	it("allows submission of valid form", () => {
		mountWrapper();
		populateForm();

		subject.find("form").simulate("submit", formEvent);

		expect(formEvent.preventDefault).toHaveBeenCalled();
		expect(utils.resetPassword).toHaveBeenCalledWith(
			{
				resetKey: "foo",
				newPassword: "password",
				newPassword2: "password"
			},
			expect.any(Function),
			expect.any(Function)
		);
	});

	it("catch error with response", () => {
		mountWrapper();
		populateForm();

		subject.find("form").simulate("submit", formEvent);
		act(() => {
			utils.resetPassword.mock.calls[0][2]({
				response: { data: { resetKey: "foo" } }
			});
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
			utils.resetPassword.mock.calls[0][2]({ response: null });
		});
		updateSubject();

		expect(formEvent.preventDefault).toHaveBeenCalled();

		expect(subject.find(Error).length).toEqual(0);
	});
});

const mountWrapper = () => {
	wrapper = mount(
		<MemoryRouter>
			<ResetPassword {...baseProps} />
		</MemoryRouter>
	);
	subject = wrapper.find(ResetPassword);
};

const updateSubject = () => {
	wrapper.update();
	subject = wrapper.find(ResetPassword);
};

const populateForm = (newPassword = "password", newPassword2 = "password") => {
	subject
		.find("input")
		.at(0)
		.simulate("change", {
			target: { name: "newPassword", value: newPassword }
		});
	subject
		.find("input")
		.at(1)
		.simulate("change", {
			target: { name: "newPassword2", value: newPassword2 }
		});
	updateSubject();
};

const baseProps = {
	match: {
		params: {
			resetKey: "foo"
		}
	}
};
