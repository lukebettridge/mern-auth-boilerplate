import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import cloneDeep from "lodash/cloneDeep";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";

import MediaQuery from "react-responsive";
import { FiUserPlus } from "react-icons/fi";

import { Table, TableAction } from "components/styles";
import Button from "components/form/button";
import AccountModal from "components/pages/admin/accounts/AccountModal";

import { actAwait, updateWrapper } from "tests/test-utils";

import Context from "components/context";
import Accounts, { USERS_QUERY } from "components/pages/admin/accounts";

const defaultMocks = [
	{
		request: {
			query: USERS_QUERY()
		},
		result: {
			data: {
				users: [
					{
						id: 1,
						forename: "John",
						surname: "Doe",
						email: "john@example.com",
						roles: ["admin"],
						active: true
					},
					{
						id: 2,
						forename: "Jane",
						surname: "Doe",
						email: "jane@example.com",
						roles: [],
						active: false
					}
				]
			}
		}
	},
	{
		request: {
			query: USERS_QUERY()
		},
		result: { data: { users: [] } }
	}
];
let wrapper;
let subject;
const context = { notification: { success: jest.fn() } };
const formEvent = { preventDefault: jest.fn() };
jest.mock("react-responsive");

describe("Accounts component", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		MediaQuery.mockImplementation(({ children }) => children(true));
	});

	afterEach(() => {
		if (wrapper) wrapper.unmount();
	});

	it("snapshot renders", async () => {
		mountWrapper();
		await updateSubject();

		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("renders users", async () => {
		mountWrapper();
		await updateSubject();

		expect(subject.find(Table).length).toEqual(1);
		expect(
			subject
				.find("tr")
				.at(1)
				.html()
		).toContain("<td>Doe</td><td>John</td><td>john@example.com</td>");
		expect(
			subject
				.find("tr")
				.at(2)
				.html()
		).toContain("<td>Doe</td><td>Jane</td><td>jane@example.com</td>");
	});

	it("renders users on mobile", async () => {
		MediaQuery.mockImplementation(({ children }) => children(false));
		mountWrapper();
		await updateSubject();

		expect(subject.find(Table).length).toEqual(2);
		expect(
			subject
				.find(Table)
				.at(0)
				.html()
		).toContain(
			"<tr><th>Surname</th><td>Doe</td></tr><tr><th>Forename</th><td>John</td></tr><tr><th>Email</th><td>john@example.com</td></tr>"
		);
		expect(
			subject
				.find(Table)
				.at(1)
				.html()
		).toContain(
			"<tr><th>Surname</th><td>Doe</td></tr><tr><th>Forename</th><td>Jane</td></tr><tr><th>Email</th><td>jane@example.com</td></tr>"
		);
	});

	it("renders loading", () => {
		mountWrapper();
		expect(subject.find("p").length).toEqual(2);
		expect(
			subject
				.find("p")
				.at(0)
				.text()
		).toEqual("Loading...");
		expect(subject.find(Table).length).toEqual(0);
	});

	it("renders error", async () => {
		const mocks = cloneDeep(defaultMocks);
		Object.assign(mocks[0], { error: new Error() });

		mountWrapper(mocks);
		await updateSubject();

		expect(subject.find("p").length).toEqual(2);
		expect(
			subject
				.find("p")
				.at(0)
				.text()
		).toEqual("error");
		expect(subject.find(Table).length).toEqual(0);
	});

	it("performs a search", async () => {
		mountWrapper();
		await updateSubject();

		subject.find("form").simulate("submit", formEvent);

		expect(formEvent.preventDefault).toHaveBeenCalled();
	});

	it("opens new account modal", async () => {
		mountWrapper();

		await clickNewAccountButton();

		expect(subject.find(AccountModal).props().isOpen).toEqual(true);
	});

	it("opens existing account modal", async () => {
		mountWrapper();
		await updateSubject();

		await clickNthResult(2);

		expect(subject.find(AccountModal).props().isOpen).toEqual(true);
	});

	it("opens existing account modal on mobile", async () => {
		MediaQuery.mockImplementation(({ children }) => children(false));
		mountWrapper();
		await updateSubject();

		subject
			.find(TableAction)
			.at(0)
			.simulate("click");
		await updateSubject();

		expect(subject.find(AccountModal).props().isOpen).toEqual(true);
	});

	it("closes the modal", async () => {
		mountWrapper();
		await clickNewAccountButton();
		expect(subject.find(AccountModal).props().isOpen).toEqual(true);

		act(() => {
			subject
				.find(AccountModal)
				.props()
				.close();
		});
		await updateSubject();

		expect(subject.find(AccountModal).props().isOpen).toEqual(false);
	});

	it("presents notification on success", async () => {
		mountWrapper();
		await updateSubject();

		await clickNthResult(2);
		subject
			.find(AccountModal)
			.props()
			.onSuccess();
		await actAwait();

		expect(baseProps.refetchCurrentUser).not.toHaveBeenCalled();
		expect(context.notification.success).toHaveBeenCalledWith(
			"The account information was updated successfully."
		);
	});

	it("presents notification on success for current user", async () => {
		mountWrapper();
		await updateSubject();

		await clickNthResult(1);
		subject
			.find(AccountModal)
			.props()
			.onSuccess();
		await actAwait();

		expect(baseProps.refetchCurrentUser).toHaveBeenCalled();
		expect(context.notification.success).toHaveBeenCalledWith(
			"The account information was updated successfully."
		);
	});

	it("New account button content on mobile", async () => {
		MediaQuery.mockImplementation(({ children }) => children(false));
		mountWrapper();

		expect(subject.find(Button).contains(<FiUserPlus />)).toEqual(true);
	});
});

const mountWrapper = (mocks = defaultMocks) => {
	wrapper = mount(
		<MockedProvider addTypename={false} mocks={mocks}>
			<MemoryRouter>
				<Context.Provider value={context}>
					<Accounts {...baseProps} />
				</Context.Provider>
			</MemoryRouter>
		</MockedProvider>
	);
	subject = wrapper.find(Accounts);
};

const updateSubject = async () => {
	await updateWrapper(wrapper);
	subject = wrapper.find(Accounts);
};

const clickNewAccountButton = async () => {
	subject
		.find(Button)
		.at(1)
		.simulate("click");
	await updateSubject();
};

const clickNthResult = async n => {
	subject
		.find("tr")
		.at(n)
		.simulate("click");
	await updateSubject();
};

const baseProps = {
	currentUser: {
		id: 1,
		forename: "John",
		surname: "Doe",
		email: "hello@example.com",
		roles: [],
		active: true
	},
	refetchCurrentUser: jest.fn()
};
