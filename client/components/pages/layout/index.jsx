import React, { useState } from "react";
import PropType from "prop-types";
import { FiSidebar } from "react-icons/fi";

import Navigation from "./Navigation";
import { Container, Paragraph } from "components/styles";

import * as S from "./styles";

const Layout = props => {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<React.Fragment>
			<S.Slider onClick={() => setShowSidebar(!showSidebar)}>
				<FiSidebar />
			</S.Slider>
			<S.Container>
				<Navigation active={showSidebar} />
				<Container inactive={showSidebar} tableCell>
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
			</S.Container>
		</React.Fragment>
	);
};

Layout.propTypes = {
	children: PropType.any
};

export default Layout;
