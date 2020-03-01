import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";

import { SingleDatePicker } from "react-dates";

import * as utils from "components/form/date-picker/utils";
import * as S from "components/form/date-picker/styles";
import DatePicker from "components/form/date-picker";

const TEST_DATE = "1970-01-01T12:00:00.000+00:00";

jest.mock("components/form/date-picker/utils", () => ({
	validate: jest.fn()
}));

describe("DatePicker component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("snapshot renders", () => {
		const subject = mount(<DatePicker />);

		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("renders label", () => {
		const subject = mount(<DatePicker label="foo" />);

		expect(subject.find(S.Label).length).toEqual(1);
		expect(subject.find(S.Label).text()).toContain("foo");
	});

	it("renders error", () => {
		const subject = mount(<DatePicker error="foo" />);

		expect(subject.find(S.Error).length).toEqual(1);
		expect(subject.find(S.Error).text()).toContain("foo");
	});

	it("renders with existing value", () => {
		const subject = mount(<DatePicker value={TEST_DATE} />);

		expect(subject.find("input").props().value).toEqual("01/01/1970");
	});

	it("calls onChange prop", () => {
		const dateMock = { valueOf: jest.fn() };
		const onChangeMock = jest.fn();
		dateMock.valueOf.mockReturnValue(TEST_DATE);
		const subject = mount(<DatePicker name="foo" onChange={onChangeMock} />);

		subject
			.find(SingleDatePicker)
			.props()
			.onDateChange(dateMock);

		expect(dateMock.valueOf).toHaveBeenCalled();
		expect(onChangeMock).toHaveBeenCalledWith({
			target: { name: "foo", value: TEST_DATE }
		});
	});

	it("calls validate on blur", () => {
		const subject = mount(<DatePicker />);

		act(() => {
			subject
				.find(SingleDatePicker)
				.props()
				.onFocusChange({ focused: false });
		});

		expect(utils.validate).toHaveBeenCalled();
	});
});
