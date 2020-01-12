import React from "react";
import PropType from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import Layout from "../pages/layout";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
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
						loading ? (
							<Layout />
						) : error ||
						  !data.currentUser ||
						  (roles &&
								!data.currentUser.roles.some(role => roles.includes(role))) ? (
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
	location: PropType.any,
	roles: PropType.arrayOf(PropType.string)
};

export default ProtectedRoute;
