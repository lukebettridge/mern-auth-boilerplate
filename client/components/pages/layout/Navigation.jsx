import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiChevronDown, FiCheckCircle, FiUser, FiUsers } from "react-icons/fi";

import * as S from "./styles";

const Navigation = props => {
	const [state, setState] = useState({
		user: false
	});

	const updateState = name => {
		setState(currentState => ({
			...state,
			[name]: !currentState[name]
		}));
	};

	return (
		<S.Navigation {...props}>
			<S.List>
				<S.ListItem>
					<S.Anchor active={state.user} onClick={() => updateState("user")}>
						<span>
							<FiUser />
							{props.currentUser.forename}
						</span>
						<FiChevronDown />
					</S.Anchor>
					<S.SubList active={state.user}>
						<S.SubListItem>
							<S.SubAnchor onClick={props.changePassword}>
								Change Password
							</S.SubAnchor>
						</S.SubListItem>
						<S.SubListItem>
							<S.SubLink to="/auth/logout">Logout</S.SubLink>
						</S.SubListItem>
					</S.SubList>
				</S.ListItem>
				<S.ListItem>
					<S.Link to="/">
						<span>
							<FiCheckCircle />
							Todos
						</span>
					</S.Link>
				</S.ListItem>
				{props.currentUser.roles.includes("admin") && (
					<S.ListItem>
						<S.Link to="/admin/accounts">
							<span>
								<FiUsers />
								Accounts
							</span>
						</S.Link>
					</S.ListItem>
				)}
			</S.List>
		</S.Navigation>
	);
};

Navigation.propTypes = {
	changePassword: PropTypes.func.isRequired,
	currentUser: PropTypes.shape({
		forename: PropTypes.string.isRequired,
		roles: PropTypes.array.isRequired
	})
};

export default Navigation;
