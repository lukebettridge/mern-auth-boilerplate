import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";

import breakpoints from "components/styles/breakpoints";
import { Body, Close, Header, Heading, Modal } from "components/modal/styles";

jest.mock("react-modal", () => "div");

describe("Modal styles", () => {
	it("snapshot renders", () => {
		const subject = mount(
			<Modal>
				<Header>
					<Close />
					<Heading />
				</Header>
				<Body />
			</Modal>
		);

		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("Body: omit align center for side modal", () => {
		const subject = mount(<Body sideModal />);

		expect(subject).not.toHaveStyleRule("text-align", "center");
	});

	it("Modal: side modal styles applied", () => {
		const subject = mount(<Modal sideModal />);

		expect(subject).toHaveStyleRule("border", "0");
		expect(subject).toHaveStyleRule("border-left", "1px solid #e9ecef");
		expect(subject).toHaveStyleRule("bottom", "0");
		expect(subject).toHaveStyleRule("left", "auto");
		expect(subject).toHaveStyleRule("max-width", "720px");
		expect(subject).toHaveStyleRule("padding", "40px 20px");
		expect(subject).toHaveStyleRule("right", "-100%");
		expect(subject).toHaveStyleRule("top", "0");
		expect(subject).toHaveStyleRule("transition", "right 0.5s");
		expect(subject).toHaveStyleRule("width", "100%");
		expect(subject).toHaveStyleRule("z-index", "2");
		expect(subject).toHaveStyleRule("right", "0", {
			modifier: "&.ReactModal__Content--after-open"
		});
		expect(subject).toHaveStyleRule("padding", "60px", {
			media: `(min-width: ${breakpoints.m})`
		});
	});

	it("Modal: non side modal styles applied", () => {
		const subject = mount(<Modal />);

		expect(subject).toHaveStyleRule("border-radius", "2px");
		expect(subject).toHaveStyleRule("padding-bottom", "62px");
		expect(subject).toHaveStyleRule("transform", "translate(-50%,-50%)");
	});
});
