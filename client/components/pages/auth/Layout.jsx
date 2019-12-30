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
				.
				<br />
				Please report to us any errors or issues you have by using the flag icon
				that can be found at the bottom of every page.
			</Paragraph>
		</Container>
	);
};

Layout.propTypes = {
	children: PropType.any
};

export default Layout;
