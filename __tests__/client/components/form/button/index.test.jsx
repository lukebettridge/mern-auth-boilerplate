import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import Button from "components/form/button";

describe("Button component", () => {
	it("snapshot renders", () => {
		const component = renderer.create(<Button />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});

	it("renders children", () => {
		const wrapper = shallow(
			<Button>
				<p>Text</p>
			</Button>
		);

		expect(wrapper.find("p").length).toEqual(1);
		expect(wrapper.find("p").text()).toEqual("Text");
	});
});
