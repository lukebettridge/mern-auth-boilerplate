import React from "react";
import PropTypes from "prop-types";

import { Container, Heading, Paragraph } from "../../styles";

const Layout = props => {
	return (
		<Container small>
			<Heading>Webapp</Heading>
			{props.children}
			<Paragraph center light>
				Developed by{" "}
				<a
					href="https://paddl.co.uk/"
					rel="noopener noreferrer"
					target="_blank"
				>
					Paddl
				</a>
				<br />. A limited company registered in England and Wales. Registered
				number: 11992253.
			</Paragraph>
		</Container>
	);
};

Layout.propTypes = {
	children: PropTypes.any
};

export default Layout;
