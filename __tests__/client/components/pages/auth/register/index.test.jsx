import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import { MemoryRouter } from "react-router-dom";

import { Success } from "components/styles";
import { Error } from "components/form/input/styles";
import * as utils from "components/pages/auth/register/utils";

import Register from "components/pages/auth/register";

let wrapper;
let subject;
const formEvent = { preventDefault: jest.fn() };
jest.mock("components/pages/auth/register/utils", () => ({
	register: jest.fn()
}));

describe("Register component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		if (wrapper) wrapper.unmount();
	});

	it("snapshot renders", () => {
		mountWrapper();
		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("prevents submission of invalid form", () => {
		mountWrapper();

		subject.find("form").simulate("submit", formEvent);

		expect(formEvent.preventDefault).toHaveBeenCalled();
		expect(utils.register).not.toHaveBeenCalled();
	});

	it("allows submission of valid form", () => {
		mountWrapper();
		populateForm();

		subject.find("form").simulate("submit", formEvent);
		act(() => {
			utils.register.mock.calls[0][1]();
		});

		expect(formEvent.preventDefault).toHaveBeenCalled();
		expect(utils.register).toHaveBeenCalledWith(
			{
				forename: "John",
				surname: "Doe",
				email: "hello@example.com",
				password: "password",
				password2: "password"
			},
			expect.any(Function),
			expect.any(Function)
		);

		updateSubject();

		expect(subject.find(Success).length).toEqual(1);
		expect(subject.find(Success).text()).toEqual(
			"Your account registration was successful!"
		);
	});

	it("catch error with response", () => {
		mountWrapper();
		populateForm();

		subject.find("form").simulate("submit", formEvent);
		act(() => {
			utils.register.mock.calls[0][2]({ response: { data: { error: "foo" } } });
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
			utils.register.mock.calls[0][2]({ response: null });
		});
		updateSubject();

		expect(formEvent.preventDefault).toHaveBeenCalled();

		expect(subject.find(Error).length).toEqual(0);
	});
});

const mountWrapper = () => {
	wrapper = mount(
		<MemoryRouter>
			<Register />
		</MemoryRouter>
	);
	subject = wrapper.find(Register);
};

const updateSubject = () => {
	wrapper.update();
	subject = wrapper.find(Register);
};

const populateForm = () => {
	subject
		.find("input")
		.at(0)
		.simulate("change", {
			target: { name: "email", value: "hello@example.com" }
		});
	subject
		.find("input")
		.at(1)
		.simulate("change", {
			target: { name: "forename", value: "John" }
		});
	subject
		.find("input")
		.at(2)
		.simulate("change", {
			target: { name: "surname", value: "Doe" }
		});
	subject
		.find("input")
		.at(3)
		.simulate("change", {
			target: { name: "password", value: "password" }
		});
	subject
		.find("input")
		.at(4)
		.simulate("change", {
			target: { name: "password2", value: "password" }
		});
	updateSubject();
};
