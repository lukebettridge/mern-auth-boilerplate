import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import cloneDeep from "lodash/cloneDeep";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";

import { updateWrapper } from "tests/test-utils";

import Layout from "components/pages/layout";

import Context from "components/context";
import ProtectedRoute, {
	CURRENT_USER_QUERY
} from "components/routes/ProtectedRoute";

const currentUser = {
	id: "1",
	forename: "John",
	surname: "Doe",
	email: "hello@example.com",
	roles: ["admin"],
	active: true
};
const defaultMocks = [
	{
		request: {
			query: CURRENT_USER_QUERY
		},
		result: {
			data: {
				currentUser
			}
		}
	}
];
const MockComponent = () => <div />;
const context = { notification: { success: jest.fn() } };
let wrapper;
let subject;

describe("ProtectedRoute component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		if (wrapper) wrapper.unmount();
	});

	it("snapshot renders", async () => {
		mountWrapper();

		await updateSubject();
		subject = wrapper.find(ProtectedRoute);

		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("renders component", async () => {
		mountWrapper();

		await updateSubject();
		subject = wrapper.find(ProtectedRoute);

		expect(subject.find(MockComponent).length).toEqual(1);
		expect(subject.find(MockComponent).props().currentUser).toEqual(
			currentUser
		);
		expect(subject.find(MockComponent).props().refetchCurrentUser).toEqual(
			expect.any(Function)
		);
	});

	it("renders loading", async () => {
		mountWrapper();
		expect(subject.find(Layout).length).toEqual(1);
		expect(subject.find(MockComponent).length).toEqual(0);
	});

	it("does not render component on error", async () => {
		const mocks = cloneDeep(defaultMocks);
		Object.assign(mocks[0], { error: new Error() });

		mountWrapper(mocks);

		await updateSubject();

		expect(subject.find(MockComponent).length).toEqual(0);
	});

	it("does not render component with no data", async () => {
		const mocks = cloneDeep(defaultMocks);
		Object.assign(mocks[0].result.data, { currentUser: null });

		mountWrapper(mocks);

		await updateSubject();

		expect(subject.find(MockComponent).length).toEqual(0);
	});

	it("does not render component without correct roles", async () => {
		const mocks = cloneDeep(defaultMocks);
		Object.assign(mocks[0].result.data.currentUser, { roles: [] });

		mountWrapper(mocks);

		await updateSubject();

		expect(subject.find(MockComponent).length).toEqual(0);
	});
});

const mountWrapper = (mocks = defaultMocks) => {
	wrapper = mount(
		<MockedProvider addTypename={false} mocks={mocks}>
			<MemoryRouter initialEntries={[{ pathname: "/path", key: "key" }]}>
				<Context.Provider value={context}>
					<ProtectedRoute
						component={MockComponent}
						path="/path"
						roles={["admin"]}
					/>
				</Context.Provider>
			</MemoryRouter>
		</MockedProvider>
	);
	subject = wrapper.find(ProtectedRoute);
};

const updateSubject = async (amount = 0) => {
	await updateWrapper(wrapper, amount);
	subject = wrapper.find(ProtectedRoute);
};
