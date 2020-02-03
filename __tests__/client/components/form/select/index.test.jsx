import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import * as S from "components/form/select/styles";
import Select from "components/form/select";

describe("Select component", () => {
	it("snapshot renders", () => {
		const subject = shallow(<Select />);

		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("renders label", () => {
		const subject = shallow(<Select label="foo" />);

		expect(subject.find(S.Label).length).toEqual(1);
		expect(subject.find(S.Label).text()).toEqual("foo");
	});

	it("renders error", () => {
		const subject = shallow(<Select error="foo" />);

		expect(subject.find(S.Error).length).toEqual(1);
		expect(subject.find(S.Error).text()).toEqual("foo");
	});

	it("calls onBlur prop", () => {
		const onBlurMock = jest.fn();
		const subject = shallow(<Select onBlur={onBlurMock} />);

		subject.find(S.Select).simulate("blur", "foo");

		expect(onBlurMock).toHaveBeenCalledWith("foo");
	});

	it("does not call onBlur prop", () => {
		const subject = shallow(<Select />);

		subject.find(S.Select).simulate("blur", "foo");

		expect(subject.props().onBlur).toBeUndefined();
	});

	it("calls onChange prop", () => {
		const onChangeMock = jest.fn();
		const subject = shallow(<Select name="foo" onChange={onChangeMock} />);

		subject.find(S.Select).simulate("change", "bar");

		expect(onChangeMock).toHaveBeenCalledWith({
			target: {
				name: "foo",
				value: "bar"
			}
		});
	});

	it("calls onChange prop with pop-value action", () => {
		const onChangeMock = jest.fn();
		const subject = shallow(<Select name="foo" onChange={onChangeMock} />);

		subject.find(S.Select).simulate(
			"change",
			[
				{ isFixed: false, value: "foo" },
				{ isFixed: true, value: "bar" }
			],
			{
				action: "pop-value",
				removedValue: { isFixed: false, value: "foo" }
			}
		);

		expect(onChangeMock).toHaveBeenCalledWith({
			target: {
				name: "foo",
				value: [
					{ isFixed: true, value: "bar" },
					{ isFixed: false, value: "foo" }
				]
			}
		});
	});

	it("calls onChange prop with pop-value action and fixed", () => {
		const onChangeMock = jest.fn();
		const subject = shallow(<Select onChange={onChangeMock} />);

		subject
			.find(S.Select)
			.simulate("change", [{ isFixed: true, value: "bar" }], {
				action: "pop-value",
				removedValue: { isFixed: true, value: "bar" }
			});

		expect(onChangeMock).not.toHaveBeenCalled();
	});

	it("calls onChange prop with clear action", () => {
		const onChangeMock = jest.fn();
		const subject = shallow(
			<Select
				name="foo"
				onChange={onChangeMock}
				options={[
					{ isFixed: true, value: "bar" },
					{ isFixed: false, value: "foo" }
				]}
			/>
		);

		subject.find(S.Select).simulate("change", [], { action: "clear" });

		expect(onChangeMock).toHaveBeenCalledWith({
			target: {
				name: "foo",
				value: [{ isFixed: true, value: "bar" }]
			}
		});
	});

	it("does not call onChange prop", () => {
		const subject = shallow(<Select name="foo" />);

		subject.find(S.Select).simulate("change", "bar");

		expect(subject.props().onChange).toBeUndefined();
	});

	describe("react-select styles prop", () => {
		[
			["multiValue", true, { color: "foo", backgroundColor: "#bbbbbb" }],
			["multiValue", false, { color: "foo" }],
			["multiValueLabel", true, { color: "white", paddingRight: 6 }],
			["multiValueLabel", false, { color: "foo" }],
			["multiValueRemove", true, { color: "foo", display: "none" }],
			["multiValueRemove", false, { color: "foo" }]
		].map(([method, isFixed, expected]) => {
			it(`${method} - isFixed: ${isFixed}`, () => {
				const subject = shallow(<Select />);

				const output = subject
					.find(S.Select)
					.props()
					.styles[method]({ color: "foo" }, { data: { isFixed } });

				expect(output).toEqual(expected);
			});
		});
	});
});
