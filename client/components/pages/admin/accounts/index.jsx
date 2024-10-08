import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import MediaQuery from "react-responsive";
import { FiUserPlus, FiSearch } from "react-icons/fi";

import Context from "components/context";

import Layout from "components/pages/layout";
import {
	FilterBody,
	FilterHeader,
	FilterWrap,
	Subheading,
	Status,
	Table,
	TableAction
} from "components/styles";
import breakpoints from "components/styles/breakpoints";
import Input from "components/form/input";
import Button from "components/form/button";
import AccountModal from "./AccountModal";

const Accounts = props => {
	const queryInput = useRef();
	const [state, setState] = useState({
		modalIsOpen: false,
		query: "",
		user: null
	});

	const openModal = (user = null) => {
		setState(prev => ({ ...prev, modalIsOpen: true, user }));
	};

	const onSearch = e => {
		e.preventDefault();
		setState(prev => ({
			...prev,
			query: queryInput.current.value
		}));
	};

	return (
		<React.Fragment>
			<Layout {...props}>
				<Subheading>Accounts</Subheading>

				<FilterWrap>
					<FilterHeader>
						<small>Filter your results</small>
					</FilterHeader>
					<FilterBody>
						<form noValidate onSubmit={onSearch}>
							<Input placeholder="Search Term" ref={queryInput} secondary />
							<Button secondary type="submit" width="unset">
								<FiSearch />
							</Button>
						</form>
						<Button onClick={() => openModal()} width="unset">
							<MediaQuery minWidth={breakpoints.m}>
								{matches => (matches ? "New Account" : <FiUserPlus />)}
							</MediaQuery>
						</Button>
					</FilterBody>
				</FilterWrap>

				<Query fetchPolicy={"no-cache"} query={USERS_QUERY(state.query)}>
					{({ loading, error, data, refetch }) => {
						if (loading) return <p>Loading...</p>;
						if (error) {
							return <p>error</p>;
						}
						return (
							<React.Fragment>
								<MediaQuery minWidth={breakpoints.l}>
									{matches =>
										matches ? (
											<Table>
												<thead>
													<tr>
														<th>Status</th>
														<th>Surname</th>
														<th>Forename</th>
														<th>Email Address</th>
													</tr>
												</thead>
												<tbody>
													{data.users.map(user => (
														<tr key={user.id} onClick={() => openModal(user)}>
															<td>
																<Status success={user.active}>
																	{user.active ? "Active" : "Inactive"}
																</Status>
															</td>
															<td>{user.surname}</td>
															<td>{user.forename}</td>
															<td>{user.email}</td>
														</tr>
													))}
												</tbody>
											</Table>
										) : (
											data.users.map(user => (
												<React.Fragment key={user.id}>
													<Table>
														<tbody>
															<tr>
																<th>Status</th>
																<td>
																	<Status success={user.active}>
																		{user.active ? "Active" : "Inactive"}
																	</Status>
																</td>
															</tr>
															<tr>
																<th>Surname</th>
																<td>{user.surname}</td>
															</tr>
															<tr>
																<th>Forename</th>
																<td>{user.forename}</td>
															</tr>
															<tr>
																<th>Email</th>
																<td>{user.email}</td>
															</tr>
														</tbody>
													</Table>
													<TableAction onClick={() => openModal(user)}>
														More Details
													</TableAction>
												</React.Fragment>
											))
										)
									}
								</MediaQuery>
								<Context.Consumer>
									{({ notification: { success } }) => (
										<AccountModal
											close={() => {
												setState(prev => ({ ...prev, modalIsOpen: false }));
											}}
											currentUser={props.currentUser}
											isOpen={state.modalIsOpen}
											onSuccess={() => {
												if (state.user?.id === props.currentUser.id)
													props.refetchCurrentUser();
												refetch();
												success(
													"The account information was updated successfully."
												);
											}}
											user={state.user}
										/>
									)}
								</Context.Consumer>
							</React.Fragment>
						);
					}}
				</Query>
			</Layout>
		</React.Fragment>
	);
};

Accounts.propTypes = {
	currentUser: PropTypes.object,
	refetchCurrentUser: PropTypes.func
};

export const USERS_QUERY = (query = "") => gql`
{
	users(query: "${query}") {
		id
		forename
		surname
		email
		roles
		active
	}
}
`;

export default Accounts;
