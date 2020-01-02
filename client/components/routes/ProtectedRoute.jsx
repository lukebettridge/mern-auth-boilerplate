import React from "react";
import PropType from "prop-types";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = () => Cookies.get("authenticated") === "true";
	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated() ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/auth/login",
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
	location: PropType.any
};

export default ProtectedRoute;
