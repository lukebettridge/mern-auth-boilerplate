import React from "react";
import renderer from "react-test-renderer";

import Input from "components/form/input";

describe("Input component", () => {
	it("snapshot renders", () => {
		const component = renderer.create(<Input />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
