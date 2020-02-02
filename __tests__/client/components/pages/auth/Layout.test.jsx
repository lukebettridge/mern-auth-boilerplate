import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Layout from "components/pages/auth/Layout";

describe("Auth Layout", () => {
	it("snapshot renders", () => {
		const subject = shallow(<Layout />);

		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("renders children", () => {
		const subject = shallow(
			<Layout>
				<p>foo</p>
			</Layout>
		);

		expect(subject.find("p").length).toEqual(1);
		expect(subject.find("p").text()).toEqual("foo");
	});
});
