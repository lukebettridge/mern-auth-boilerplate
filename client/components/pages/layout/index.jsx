import React, { useState } from "react";
import PropType from "prop-types";
import { FiX, FiMenu } from "react-icons/fi";

import { Container, Paragraph } from "components/styles";
import Navigation from "./Navigation";
import ChangePasswordModal from "./ChangePasswordModal";

import * as S from "./styles";

const Layout = props => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	return (
		<React.Fragment>
			<S.Slider onClick={() => setShowSidebar(!showSidebar)}>
				{showSidebar ? <FiX /> : <FiMenu />}
			</S.Slider>
			<S.Container>
				<Navigation
					active={showSidebar}
					changePassword={() => setModalIsOpen(true)}
					currentUser={props.currentUser}
				/>
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
			<ChangePasswordModal
				close={() => setModalIsOpen(false)}
				isOpen={modalIsOpen}
			/>
		</React.Fragment>
	);
};

Layout.propTypes = {
	children: PropType.any,
	currentUser: PropType.shape({
		forename: PropType.string.isRequired,
		surname: PropType.string,
		email: PropType.string,
		roles: PropType.array.isRequired,
		active: PropType.bool
	})
};

Layout.defaultProps = {
	currentUser: {
		forename: "User",
		roles: []
	}
};

export default Layout;
