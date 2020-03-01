import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import * as S from "components/form/select/styles";
import { Select } from "components/form/select";

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

	it("renders creatable", () => {
		const subject = shallow(<Select isCreatable />);

		expect(subject.find(S.CreatableSelect).length).toEqual(1);
	});

	it("calls handleCreate", () => {
		const client = {
			mutate: jest.fn(),
			then: jest.fn()
		};
		const mutation = jest.fn();
		const onChange = jest.fn();
		client.mutate.mockReturnValue(client);
		mutation.mockReturnValue("bar");
		const subject = shallow(
			<Select
				client={client}
				isCreatable
				mutation={mutation}
				name="creatable-select"
				onChange={onChange}
			/>
		);

		subject
			.find(S.CreatableSelect)
			.props()
			.onCreateOption("foo");
		client.then.mock.calls[0][0]({ data: { a: "value" } });

		expect(mutation).toHaveBeenCalledWith("foo");
		expect(client.mutate).toHaveBeenCalledWith("bar");
		expect(client.then).toHaveBeenCalledWith(expect.any(Function));

		expect(onChange).toHaveBeenCalledWith({
			target: { name: "creatable-select", value: "value" }
		});
	});

	it("doesn't call mutate with no mutation prop", () => {
		const client = {
			mutate: jest.fn()
		};
		const subject = shallow(<Select client={client} isCreatable />);

		subject
			.find(S.CreatableSelect)
			.props()
			.onCreateOption("foo");

		expect(client.mutate).not.toHaveBeenCalled();
	});

	it("calls onBlur prop", () => {
		const onBlurMock = jest.fn();
		const subject = shallow(<Select onBlur={onBlurMock} />);

		subject.find(S.Select).simulate("blur", "foo");

		expect(onBlurMock).toHaveBeenCalledWith("foo");
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
