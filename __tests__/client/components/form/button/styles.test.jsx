import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";

import { Button } from "components/form/button/styles";

describe("Button styles", () => {
	it("snapshot renders", () => {
		const subject = mount(<Button />);

		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("secondary rules applied", () => {
		const subject = mount(<Button secondary />);

		expect(subject).toHaveStyleRule("background-color", "transparent");
		expect(subject).toHaveStyleRule("border", "1px solid #a3cdf3");
		expect(subject).toHaveStyleRule("color", "#1a82e2");
		expect(subject).toHaveStyleRule("background-color", "#e8f2fc", {
			modifier: ":hover:not(:disabled)"
		});
	});

	it("custom width applied", () => {
		const subject = mount(<Button width="100px" />);

		expect(subject).toHaveStyleRule("width", "100px");
	});
});
