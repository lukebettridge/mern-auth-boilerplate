import React from "react";
import PropType from "prop-types";

import { Container, Heading, Paragraph } from "../../styles";

const Layout = props => {
	return (
		<Container small>
			<Heading>Webapp</Heading>
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
				<br />. A limited company registered in England and Wales. Registered
				number: 11992253.
			</Paragraph>
		</Container>
	);
};

Layout.propTypes = {
	children: PropType.any
};

export default Layout;
