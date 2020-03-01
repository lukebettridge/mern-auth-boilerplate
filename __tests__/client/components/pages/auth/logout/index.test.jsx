import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import cloneDeep from "lodash/cloneDeep";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";

import { updateWrapper } from "tests/test-utils";

import Layout from "components/pages/auth/Layout";
import { Paragraph } from "components/styles";

import Logout, { ADD_TOKEN_MUTATION } from "components/pages/auth/logout";

const defaultMocks = [
	{
		request: {
			query: ADD_TOKEN_MUTATION
		},
		result: {
			data: { addToken: true }
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

		await updateSubject(100);

		expect(toJSON(subject)).toMatchSnapshot();
	});

	it.skip("renders component", async () => {
		mountWrapper();

		await updateSubject();

		expect(subject.find(Paragraph).length).toEqual(2);
	});

	it("renders loading", () => {
		mountWrapper();
		expect(subject.find(Layout).length).toEqual(1);
		expect(subject.find(Paragraph).length).toEqual(1);
	});

	it("does not render component on error", async () => {
		const mocks = cloneDeep(defaultMocks);
		Object.assign(mocks[0], { error: new Error() });

		mountWrapper(mocks);

		await updateSubject();

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

const updateSubject = async (amount = 0) => {
	await updateWrapper(wrapper, amount);
	subject = wrapper.find(Logout);
};
