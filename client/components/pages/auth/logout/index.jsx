import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Layout from "../Layout";

const Logout = () => {
	Cookies.remove("authenticated");
	return (
		<Layout>
			<Link to="/auth/login">Login</Link>
			Successfully logged out.
		</Layout>
	);
};

export default Logout;
