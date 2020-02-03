import React from "react";
import { mount } from "enzyme";

import { Select, SelectContainer } from "components/form/select/styles";

describe("Select styles", () => {
	it("has value applied", () => {
		const subject = mount(<Select value="foo" />);

		expect(subject).toHaveStyleRule("font-size", "75%", {
			modifier: "+ label"
		});
		expect(subject).toHaveStyleRule("transform", "translate3d(0,-100%,0)", {
			modifier: "+ label"
		});
		expect(subject).toHaveStyleRule("opacity", "1", {
			modifier: "+ label"
		});
	});

	it("in error applied", () => {
		const subject = mount(<Select inError={true} />);

		expect(subject).toHaveStyleRule("border-color", "#db1802", {
			modifier: ".react-select__control"
		});
		expect(subject).toHaveStyleRule("color", "#db1802", {
			modifier: "+ label"
		});
	});

	it("has label applied", () => {
		const subject = mount(<SelectContainer label="foo" />);

		expect(subject).toHaveStyleRule("margin-top", "30px");
	});

	it("bottom margin applied", () => {
		const subject = mount(<SelectContainer mb />);

		expect(subject).toHaveStyleRule("margin-bottom", "30px");
	});
});
