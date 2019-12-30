import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
	Cookies.remove("authenticated");
	return (
		<div>
			<Link to="/login">Login</Link>
			Successfully logged out.
		</div>
	);
};

export default Logout;
