import React from "react";
import PropType from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Cookies from "js-cookie";

import Layout from "../pages/layout";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = Cookies.get("authenticated") === "true";
	const redirect = props => (
		<Redirect
			to={{
				pathname: "/auth/login",
				state: { from: props.location }
			}}
		/>
	);

	return (
		<Route
			{...rest}
			render={props => (
				<Query
					fetchPolicy={"no-cache"}
					query={gql`
						{
							currentUser {
								id
								forename
								surname
								email
								roles
								active
							}
						}
					`}
				>
					{({ loading, error, data }) =>
						isAuthenticated && loading ? (
							<Layout />
						) : !isAuthenticated || error || !data.currentUser ? (
							redirect(props)
						) : (
							<Component {...props} currentUser={data.currentUser} />
						)
					}
				</Query>
			)}
		/>
	);
};

ProtectedRoute.propTypes = {
	component: PropType.any,
	location: PropType.any
};

export default ProtectedRoute;
