import React from "react";
import PropType from "prop-types";

import Navigation from "./Navigation";
import { Container, Paragraph } from "components/styles";

const Layout = props => {
	return (
		<React.Fragment>
			<Navigation />
			<Container tableCell>
				{props.children}
				<Paragraph center light mt="l">
					Developed by{" "}
					<a
						href="https://paddl.co.uk/"
						rel="noopener noreferrer"
						target="_blank"
					>
						Paddl
					</a>
					.
				</Paragraph>
			</Container>
		</React.Fragment>
	);
};

Layout.propTypes = {
	children: PropType.any
};

export default Layout;
