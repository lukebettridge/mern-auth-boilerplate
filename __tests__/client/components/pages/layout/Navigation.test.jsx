import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import cloneDeep from "lodash/cloneDeep";
import { MemoryRouter } from "react-router-dom";

import * as S from "components/pages/layout/styles";

import Navigation from "components/pages/layout/Navigation";

let wrapper;
let subject;

describe("Layout component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		if (wrapper) wrapper.unmount();
	});

	it("snapshot renders", () => {
		mountWrapper();
		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("renders component", () => {
		mountWrapper();

		expect(subject).not.toBeNull();
		expect(subject.find(S.Anchor).html()).toContain("John");
		expect(subject.find(S.ListItem).length).toEqual(2);
	});

	it("set anchor to active", () => {
		mountWrapper();

		subject.find(S.Anchor).simulate("click");
		updateSubject();

		expect(subject.find(S.Anchor).props().active).toEqual(true);
	});

	it("show account page for admin", () => {
		const props = cloneDeep(baseProps);
		Object.assign(props.currentUser, { roles: ["admin"] });

		mountWrapper(props);

		expect(subject.find(S.ListItem).length).toEqual(3);
		expect(
			subject
				.find(S.ListItem)
				.at(2)
				.html()
		).toContain("Accounts");
	});

	it("calls edit profile prop", () => {
		mountWrapper();

		subject
			.find(S.SubAnchor)
			.at(0)
			.simulate("click");

		expect(baseProps.editProfile).toHaveBeenCalled();
	});

	it("calls change password prop", () => {
		mountWrapper();

		subject
			.find(S.SubAnchor)
			.at(1)
			.simulate("click");

		expect(baseProps.changePassword).toHaveBeenCalled();
	});
});

const mountWrapper = (props = baseProps) => {
	wrapper = mount(
		<MemoryRouter initialEntries={[{ pathname: "/path", key: "key" }]}>
			<Navigation {...props} />
		</MemoryRouter>
	);
	subject = wrapper.find(Navigation);
};

const updateSubject = () => {
	wrapper.update();
	subject = wrapper.find(Navigation);
};

const baseProps = {
	changePassword: jest.fn(),
	currentUser: {
		forename: "John",
		roles: []
	},
	editProfile: jest.fn()
};
