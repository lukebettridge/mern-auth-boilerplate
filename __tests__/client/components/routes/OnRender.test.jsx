import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";

import OnRender from "components/routes/OnRender";

const method = jest.fn();

describe("OnRender component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("snapshot renders", () => {
		const subject = mount(<OnRender method={method} />);
		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("calls method prop on mount", () => {
		const subject = mount(<OnRender method={method} />);
		expect(method).toHaveBeenCalled();
		expect(subject).toEqual({});
	});
});
