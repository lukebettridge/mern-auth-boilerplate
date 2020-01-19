import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import { ApolloProvider } from "react-apollo";
import { Route } from "react-router-dom";

import ProtectedRoute from "components/routes/ProtectedRoute";
import { Login, Logout, Register, ResetPassword } from "components/pages/auth";
import { Accounts } from "components/pages/admin";
import Home from "components/pages/home";
import App from "components/App";

describe("App component", () => {
	it("snapshot renders", () => {
		const subject = shallow(<App />);

		expect(toJSON(subject)).toMatchSnapshot();
	});

	it("renders apollo provider with client", () => {
		const subject = shallow(<App />);
		const apolloProvider = subject.find(ApolloProvider);

		expect(apolloProvider.length).toEqual(1);
		expect(apolloProvider.get(0).props.client).toBeTruthy();
	});

	it("renders all routes", () => {
		const subject = shallow(<App />);
		expect(subject.find(Route).length).toEqual(4);
		expect(subject.find(ProtectedRoute).length).toEqual(2);
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
			const subject = shallow(<App />);
			const props = subject.find(Route).get(index).props;

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
			const subject = shallow(<App />);
			const props = subject.find(ProtectedRoute).get(index).props;

			expect(props.component).toBe(component);
			expect(props.path).toEqual(route);
		});
	});
});
