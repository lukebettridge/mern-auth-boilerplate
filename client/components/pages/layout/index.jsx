import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiX, FiMenu } from "react-icons/fi";

import Context from "components/context";

import { Container } from "components/styles";
import Navigation from "./Navigation";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

import * as S from "./styles";

const Layout = props => {
	const [changePassword, setChangePassword] = useState(false);
	const [editProfile, setEditProfile] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<React.Fragment>
			<S.Slider onClick={() => setShowSidebar(!showSidebar)}>
				{showSidebar ? <FiX /> : <FiMenu />}
			</S.Slider>
			<S.Container>
				<Navigation
					active={showSidebar}
					changePassword={() => setChangePassword(true)}
					currentUser={props.currentUser}
					editProfile={() => setEditProfile(true)}
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
					<React.Fragment>
						<ChangePasswordModal
							close={() => setChangePassword(false)}
							isOpen={changePassword}
							onSuccess={() =>
								success("Your password was changed successfully.")
							}
						/>
						<EditProfileModal
							close={() => {
								setEditProfile(false);
								props.refetchCurrentUser();
							}}
							currentUser={props.currentUser}
							isOpen={editProfile}
							onSuccess={() =>
								success("Your profile was updated successfully.")
							}
						/>
					</React.Fragment>
				)}
			</Context.Consumer>
		</React.Fragment>
	);
};

Layout.propTypes = {
	children: PropTypes.any,
	currentUser: PropTypes.shape({
		forename: PropTypes.string.isRequired,
		surname: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		roles: PropTypes.array.isRequired,
		active: PropTypes.bool
	}),
	refetchCurrentUser: PropTypes.func.isRequired
};

Layout.defaultProps = {
	currentUser: {
		forename: "User",
		surname: "",
		email: "",
		roles: []
	},
	refetchCurrentUser: () => {}
};

export default Layout;
