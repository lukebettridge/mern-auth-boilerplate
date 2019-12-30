import React from "react";
import PropType from "prop-types";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = () => {
		const authenticated = Cookies.get("authenticated");
		return authenticated && authenticated === "true";
	};

	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated() ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
};

ProtectedRoute.propTypes = {
	component: PropType.any,
	location: PropType.string
};

export default ProtectedRoute;
