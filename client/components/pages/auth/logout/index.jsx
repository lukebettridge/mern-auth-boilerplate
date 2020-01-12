import React from "react";
import { Redirect } from "react-router-dom";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import Layout from "../Layout";
import OnRender from "./OnRender";
import { Box, Paragraph, RouterLink } from "components/styles";

const Logout = () => {
	return (
		<Layout>
			<Box>
				<Mutation
					mutation={gql`
						mutation addToken {
							addToken
						}
					`}
				>
					{(mutation, { loading, error, data }) => {
						if (loading) return null;
						if (error)
							return (
								<Redirect
									to={{
										pathname: "/auth/login"
									}}
								/>
							);
						if (data)
							return (
								<React.Fragment>
									<Paragraph>You have been logged out successfully.</Paragraph>
									<RouterLink to="/auth/login">Go back to login</RouterLink>
								</React.Fragment>
							);
						return <OnRender mutation={mutation} />;
					}}
				</Mutation>
			</Box>
		</Layout>
	);
};

export default Logout;
