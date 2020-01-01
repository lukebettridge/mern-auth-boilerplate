import React from "react";
import Cookies from "js-cookie";

import Layout from "../Layout";
import { Box, Paragraph } from "components/styles";
import Button from "components/form/button";

const Logout = () => {
	Cookies.remove("authenticated");
	return (
		<Layout>
			<Box>
				<Paragraph>You have been logged out successfully.</Paragraph>
				<Button as="a" href="/auth/login" mt="s" type="text">
					Go back to login
				</Button>
			</Box>
		</Layout>
	);
};

export default Logout;
