import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";

import { FiX, FiMenu } from "react-icons/fi";

import { Container } from "components/styles";
import Navigation from "components/pages/layout/Navigation";
import EditProfileModal from "components/pages/layout/EditProfileModal";
import ChangePasswordModal from "components/pages/layout/ChangePasswordModal";
import * as S from "components/pages/layout/styles";

import Context from "components/context";
import Layout from "components/pages/layout";

const context = { notification: { success: jest.fn() } };
let wrapper;
let subject;

describe("Layout component", () => {
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

	it("renders children", () => {
		mountWrapper(baseProps, <p>foo</p>);

		expect(subject.find("p").length).toEqual(2);
		expect(
			subject
				.find("p")
				.at(0)
				.text()
		).toEqual("foo");
	});

	it("toggles the sidebar", () => {
		mountWrapper();
		expect(subject.find(FiMenu).length).toEqual(1);
		expect(subject.find(FiX).length).toEqual(0);
		expect(subject.find(Navigation).props().active).toEqual(false);
		expect(subject.find(Container).props().inactive).toEqual(false);

		subject.find(S.Slider).simulate("click");
		updateSubject();

		expect(subject.find(FiMenu).length).toEqual(0);
		expect(subject.find(FiX).length).toEqual(1);
		expect(subject.find(Navigation).props().active).toEqual(true);
		expect(subject.find(Container).props().inactive).toEqual(true);
	});

	describe("change password", () => {
		it("opens the modal", () => {
			mountWrapper();
			expect(subject.find(ChangePasswordModal).props().isOpen).toEqual(false);

			openModal();

			expect(subject.find(ChangePasswordModal).props().isOpen).toEqual(true);
		});

		it("closes the modal", () => {
			mountWrapper();
			openModal();

			act(() => {
				subject
					.find(ChangePasswordModal)
					.props()
					.close();
			});
			updateSubject();

			expect(subject.find(ChangePasswordModal).props().isOpen).toEqual(false);
		});

		it("presents notification on success", () => {
			mountWrapper();
			openModal();

			subject
				.find(ChangePasswordModal)
				.props()
				.onSuccess();

			expect(context.notification.success).toHaveBeenCalledWith(
				"Your password was changed successfully."
			);
		});

		const openModal = () => {
			act(() => {
				subject
					.find(Navigation)
					.props()
					.changePassword();
			});
			updateSubject();
		};
	});

	describe("edit profile", () => {
		it("opens the modal", () => {
			mountWrapper();
			expect(subject.find(EditProfileModal).props().isOpen).toEqual(false);

			openModal();

			expect(subject.find(EditProfileModal).props().isOpen).toEqual(true);
		});

		it("closes the modal", () => {
			mountWrapper();
			openModal();

			act(() => {
				subject
					.find(EditProfileModal)
					.props()
					.close();
			});
			updateSubject();

			expect(subject.find(EditProfileModal).props().isOpen).toEqual(false);
			expect(baseProps.refetchCurrentUser).toHaveBeenCalled();
		});

		it("presents notification on success", () => {
			mountWrapper();
			openModal();

			subject
				.find(EditProfileModal)
				.props()
				.onSuccess();

			expect(context.notification.success).toHaveBeenCalledWith(
				"Your profile was updated successfully."
			);
		});

		const openModal = () => {
			act(() => {
				subject
					.find(Navigation)
					.props()
					.editProfile();
			});
			updateSubject();
		};
	});
});

const mountWrapper = (props = baseProps, children = null) => {
	wrapper = mount(
		<MockedProvider>
			<MemoryRouter initialEntries={[{ pathname: "/path", key: "key" }]}>
				<Context.Provider value={context}>
					<Layout {...props}>{children}</Layout>
				</Context.Provider>
			</MemoryRouter>
		</MockedProvider>
	);
	subject = wrapper.find(Layout);
};

const updateSubject = () => {
	wrapper.update();
	subject = wrapper.find(Layout);
};

const baseProps = {
	currentUser: {
		forename: "John",
		surname: "Doe",
		email: "hello@example.com",
		roles: [],
		active: true
	},
	refetchCurrentUser: jest.fn()
};
