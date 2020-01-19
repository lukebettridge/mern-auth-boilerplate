import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Button from "components/form/button";

describe("Button component", () => {
	it("snapshot renders", () => {
		const subject = shallow(<Button />);

		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("renders children", () => {
		const subject = shallow(
			<Button>
				<p>foo</p>
			</Button>
		);

		expect(subject.find("p").length).toEqual(1);
		expect(subject.find("p").text()).toEqual("foo");
	});
});
