import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Input from "components/form/input";

describe("Input component", () => {
	it("snapshot renders", () => {
		const subject = shallow(<Input />);

		expect(toJSON(subject)).toMatchSnapshot();
	});
});
