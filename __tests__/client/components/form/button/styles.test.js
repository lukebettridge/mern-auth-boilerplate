import React from "react";
import renderer from "react-test-renderer";

import { Button } from "components/form/button/styles";

describe("Button styles", () => {
	it("snapshot renders", () => {
		const component = renderer.create(<Button />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});

	it("secondary rules applied", () => {
		const component = renderer.create(<Button secondary />);
		const tree = component.toJSON();

		expect(tree).toHaveStyleRule("background-color", "transparent");
		expect(tree).toHaveStyleRule("border", "1px solid #a3cdf3");
		expect(tree).toHaveStyleRule("color", "#1a82e2");
		expect(tree).toHaveStyleRule("background-color", "#e8f2fc", {
			modifier: ":hover:not(:disabled)"
		});
	});

	it("custom width applied", () => {
		const component = renderer.create(<Button width="100px" />);
		const tree = component.toJSON();

		expect(tree).toHaveStyleRule("width", "100px");
	});
});
