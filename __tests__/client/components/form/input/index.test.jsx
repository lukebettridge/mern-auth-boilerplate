import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import * as S from "components/form/input/styles";
import Input from "components/form/input";

describe("Input component", () => {
	it("snapshot renders", () => {
		const subject = shallow(<Input />);

		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("renders label", () => {
		const subject = shallow(<Input label="foo" />);

		expect(subject.find(S.Label).length).toEqual(1);
		expect(subject.find(S.Label).text()).toEqual("foo");
	});

	it("renders error", () => {
		const subject = shallow(<Input error="foo" />);

		expect(subject.find(S.Error).length).toEqual(1);
		expect(subject.find(S.Error).text()).toEqual("foo");
	});

	it("calls onBlur prop", () => {
		const onBlurMock = jest.fn();
		const subject = shallow(<Input onBlur={onBlurMock} />);

		subject.find(S.Input).simulate("blur", "foo");

		expect(onBlurMock).toHaveBeenCalledWith("foo");
	});

	it("does not call onBlur prop", () => {
		const subject = shallow(<Input />);

		subject.find(S.Input).simulate("blur", "foo");

		expect(subject.props().onBlur).toBeUndefined();
	});

	it("calls onChange prop", () => {
		const onChangeMock = jest.fn();
		const subject = shallow(<Input onChange={onChangeMock} />);

		subject.find(S.Input).simulate("change", "foo");

		expect(onChangeMock).toHaveBeenCalledWith("foo");
	});

	it("does not call onChange prop", () => {
		const subject = shallow(<Input />);

		subject.find(S.Input).simulate("change", "foo");

		expect(subject.props().onChange).toBeUndefined();
	});
});
