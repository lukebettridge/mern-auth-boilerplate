import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import { ApolloProvider } from "react-apollo";
import { Route } from "react-router-dom";

import ProtectedRoute from "components/routes/ProtectedRoute";
import { Login, Logout, Register, ResetPassword } from "components/pages/auth";
import { Accounts } from "components/pages/admin";
import Home from "components/pages/home";
import App from "components/App";

describe("App component", () => {
	it("snapshot renders", () => {
		const component = renderer.create(<App />);
		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});

	it("renders apollo provider with client", () => {
		const wrapper = shallow(<App />);
		const apolloProvider = wrapper.find(ApolloProvider);

		expect(apolloProvider.length).toEqual(1);
		expect(apolloProvider.get(0).props.client).toBeTruthy();
	});

	it("renders all routes", () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(Route).length).toEqual(4);
		expect(wrapper.find(ProtectedRoute).length).toEqual(2);
	});

	[
		{
			component: Login,
			route: "/auth/login"
		},
		{
			component: Logout,
			route: "/auth/logout"
		},
		{
			component: Register,
			route: "/auth/register"
		},
		{
			component: ResetPassword,
			route: "/auth/reset-password/:resetKey"
		}
	].map(({ component, route }, index) => {
		it(`passes route props for ${route}`, () => {
			const wrapper = shallow(<App />);
			const props = wrapper.find(Route).get(index).props;

			expect(props.component).toBe(component);
			expect(props.path).toEqual(route);
		});
	});

	[
		{
			component: Home,
			route: "/(|home)/"
		},
		{
			component: Accounts,
			route: "/admin/accounts"
		}
	].map(({ component, route }, index) => {
		it(`passes protected route props for ${route}`, () => {
			const wrapper = shallow(<App />);
			const props = wrapper.find(ProtectedRoute).get(index).props;

			expect(props.component).toBe(component);
			expect(props.path).toEqual(route);
		});
	});
});
