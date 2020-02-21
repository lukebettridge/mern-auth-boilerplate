import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import cloneDeep from "lodash/cloneDeep";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";

import MediaQuery from "react-responsive";
import { FiPlus } from "react-icons/fi";

import { Table, TableAction } from "components/styles";
import Button from "components/form/button";
import TodoModal from "components/pages/home/TodoModal";

import { actAwait, updateWrapper } from "tests/test-utils";

import Context from "components/context";
import Home, { TODOS_QUERY } from "components/pages/home";

const defaultMocks = [
	{
		request: {
			query: TODOS_QUERY()
		},
		result: {
			data: {
				todos: [
					{
						id: 1,
						text: "foo"
					},
					{
						id: 2,
						text: "bar"
					}
				]
			}
		}
	},
	{
		request: {
			query: TODOS_QUERY()
		},
		result: { data: { todos: [] } }
	}
];
let wrapper;
let subject;
const context = { notification: { success: jest.fn() } };
const formEvent = { preventDefault: jest.fn() };
jest.mock("react-responsive");

describe("Home component", () => {
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

	it("renders todos", async () => {
		mountWrapper();
		await updateSubject();

		expect(subject.find(Table).length).toEqual(1);
		expect(
			subject
				.find("tr")
				.at(1)
				.html()
		).toContain("<tr><td>foo</td></tr>");
		expect(
			subject
				.find("tr")
				.at(2)
				.html()
		).toContain("<tr><td>bar</td></tr>");
	});

	it("renders todos on mobile", async () => {
		MediaQuery.mockImplementation(({ children }) => children(false));
		mountWrapper();
		await updateSubject();

		expect(subject.find(Table).length).toEqual(2);
		expect(
			subject
				.find(Table)
				.at(0)
				.html()
		).toContain("<tr><th>Description</th><td>foo</td></tr>");
		expect(
			subject
				.find(Table)
				.at(1)
				.html()
		).toContain("<tr><th>Description</th><td>bar</td></tr>");
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

	it("opens new todo modal", async () => {
		mountWrapper();

		await clickNewTodoButton();

		expect(subject.find(TodoModal).props().isOpen).toEqual(true);
	});

	it("opens existing todo modal", async () => {
		mountWrapper();
		await updateSubject();

		await clickNthResult(2);

		expect(subject.find(TodoModal).props().isOpen).toEqual(true);
	});

	it("opens existing todo modal on mobile", async () => {
		MediaQuery.mockImplementation(({ children }) => children(false));
		mountWrapper();
		await updateSubject();

		subject
			.find(TableAction)
			.at(0)
			.simulate("click");
		await updateSubject();

		expect(subject.find(TodoModal).props().isOpen).toEqual(true);
	});

	it("closes the modal", async () => {
		mountWrapper();
		await clickNewTodoButton();
		expect(subject.find(TodoModal).props().isOpen).toEqual(true);

		act(() => {
			subject
				.find(TodoModal)
				.props()
				.close();
		});
		await updateSubject();

		expect(subject.find(TodoModal).props().isOpen).toEqual(false);
	});

	it("presents notification on success", async () => {
		mountWrapper();
		await updateSubject();

		await clickNthResult(2);
		subject
			.find(TodoModal)
			.props()
			.onSuccess();
		await actAwait();

		expect(context.notification.success).toHaveBeenCalledWith(
			"The todo information was updated successfully."
		);
	});

	it("New todo button content on mobile", async () => {
		MediaQuery.mockImplementation(({ children }) => children(false));
		mountWrapper();

		expect(subject.find(Button).contains(<FiPlus />)).toEqual(true);
	});
});

const mountWrapper = (mocks = defaultMocks) => {
	wrapper = mount(
		<MockedProvider addTypename={false} mocks={mocks}>
			<MemoryRouter>
				<Context.Provider value={context}>
					<Home {...baseProps} />
				</Context.Provider>
			</MemoryRouter>
		</MockedProvider>
	);
	subject = wrapper.find(Home);
};

const updateSubject = async () => {
	await updateWrapper(wrapper);
	subject = wrapper.find(Home);
};

const clickNewTodoButton = async () => {
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
