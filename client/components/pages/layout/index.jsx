import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiX, FiMenu } from "react-icons/fi";

import Context from "components/context";

import { Container } from "components/styles";
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
					<S.Footer>
						Developed by{" "}
						<a
							href="https://paddl.co.uk/"
							rel="noopener noreferrer"
							target="_blank"
						>
							Paddl
						</a>
						.
					</S.Footer>
				</Container>
			</S.Container>
			<Context.Consumer>
				{({ notification: { success } }) => (
					<ChangePasswordModal
						close={() => setModalIsOpen(false)}
						isOpen={modalIsOpen}
						onSuccess={() => success("Your password was changed successfully.")}
					/>
				)}
			</Context.Consumer>
		</React.Fragment>
	);
};

Layout.propTypes = {
	children: PropTypes.any,
	currentUser: PropTypes.shape({
		forename: PropTypes.string.isRequired,
		surname: PropTypes.string,
		email: PropTypes.string,
		roles: PropTypes.array.isRequired,
		active: PropTypes.bool
	})
};

Layout.defaultProps = {
	currentUser: {
		forename: "User",
		roles: []
	}
};

export default Layout;
