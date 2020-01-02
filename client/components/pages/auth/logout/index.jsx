import React from "react";
import Cookies from "js-cookie";

import Layout from "../Layout";
import { Box, Paragraph, RouterLink } from "components/styles";

const Logout = () => {
	Cookies.remove("authenticated");
	return (
		<Layout>
			<Box>
				<Paragraph>You have been logged out successfully.</Paragraph>
				<RouterLink mt="l" to="/auth/login">
					Go back to login
				</RouterLink>
			</Box>
		</Layout>
	);
};

export default Logout;
