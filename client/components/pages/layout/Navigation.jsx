import React, { useState } from "react";
import PropType from "prop-types";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import {
	FiChevronDown,
	FiMail,
	FiPackage,
	FiSettings,
	FiSidebar,
	FiUser,
	FiUsers
} from "react-icons/fi";

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
							<Query
								fetchPolicy={"no-cache"}
								query={gql`
									{
										currentUser {
											forename
										}
									}
								`}
							>
								{({ loading, error, data }) =>
									loading || error ? "User" : data.currentUser.forename
								}
							</Query>
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
							<FiSidebar />
							Dashboard
						</span>
					</S.Link>
				</S.ListItem>
				<S.ListItem>
					<S.Link to="/">
						<span>
							<FiPackage />
							Orders
						</span>
						<FiChevronDown />
					</S.Link>
				</S.ListItem>
				<S.ListItem>
					<S.Link to="/">
						<span>
							<FiMail />
							Messages
						</span>
						<FiChevronDown />
					</S.Link>
				</S.ListItem>
				<Query
					fetchPolicy={"no-cache"}
					query={gql`
						{
							currentUser {
								roles
							}
						}
					`}
				>
					{({ loading, error, data }) =>
						!loading &&
						!error &&
						data.currentUser.roles.includes("admin") && (
							<S.ListItem>
								<S.Link to="/admin/accounts">
									<span>
										<FiUsers />
										Accounts
									</span>
								</S.Link>
							</S.ListItem>
						)
					}
				</Query>
				<S.ListItem>
					<S.Link to="/">
						<span>
							<FiSettings />
							Settings
						</span>
						<FiChevronDown />
					</S.Link>
				</S.ListItem>
			</S.List>
		</S.Navigation>
	);
};

Navigation.propTypes = {
	changePassword: PropType.func.isRequired
};

export default Navigation;
