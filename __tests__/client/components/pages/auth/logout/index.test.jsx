import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";

import { Paragraph } from "components/styles";

import Logout, { ADD_TOKEN_MUTATION } from "components/pages/auth/logout";

const defaultMocks = [
	{
		request: {
			query: ADD_TOKEN_MUTATION
		},
		result: {
			data: true
		}
	}
];
let wrapper;
let subject;

describe("Logout component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		if (wrapper) wrapper.unmount();
	});

	it("snapshot renders", async () => {
		mountWrapper();
		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("renders content", async () => {
		mountWrapper();
		expect(subject.find(Paragraph).length).toEqual(1);
	});
});

const mountWrapper = (mocks = defaultMocks) => {
	wrapper = mount(
		<MockedProvider addTypename={false} mocks={mocks}>
			<MemoryRouter>
				<Logout />
			</MemoryRouter>
		</MockedProvider>
	);
	subject = wrapper.find(Logout);
};
