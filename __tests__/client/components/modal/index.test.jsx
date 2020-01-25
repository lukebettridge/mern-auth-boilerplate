import React from "react";
import { mount } from "enzyme";

import { Heading } from "components/modal/styles";
import Modal from "components/modal";

describe("Modal component", () => {
	it("renders children", () => {
		const subject = mount(
			<Modal isOpen={true}>
				<p>foo</p>
			</Modal>
		);

		expect(subject.find("p").length).toEqual(1);
		expect(subject.find("p").text()).toEqual("foo");
	});

	it("renders a heading with title prop", () => {
		const subject = mount(<Modal isOpen={true} title={"foo"} />);

		expect(subject.find(Heading).length).toEqual(1);
		expect(subject.find(Heading).text()).toEqual("foo");
	});
});
