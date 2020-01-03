import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import { Mutation, Query } from "react-apollo";
import { gql } from "apollo-boost";

import { pattern } from "utils";
import { Box, Paragraph, Table, TableAction } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";

const AccountModal = props => {
	const initialState = {
		editing: false,
		email: "",
		errors: {},
		success: false,
		user: props.user || {},
		validate: false
	};
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (props.isOpen) setState(initialState);
		else setState({ ...state, user: {} });
	}, [props.isOpen]);

	useEffect(() => {
		if (state.validate) setState({ ...state, validate: false });
	}, [state.validate]);

	const onChange = e =>
		setState({
			...state,
			user: {
				...state.user,
				[e.target.name]: e.target.value
			}
		});

	const updateUser = mutation => {
		setState({ ...state, validate: true });

		mutation().then(() => {
			setState({ ...state, editing: false });
		});
	};

	const deactivateUser = mutation => {
		mutation().then(({ data }) => {
			setState({
				...state,
				user: {
					...state.user,
					active: data.deactivateUser
				}
			});
		});
	};

	const activateUser = mutation => {
		mutation().then(({ data }) => {
			setState({
				...state,
				user: {
					...state.user,
					active: data.activateUser
				}
			});
		});
	};

	const { id, forename, surname, email, active } = state.user;

	return (
		<Modal
			close={props.close}
			isOpen={props.isOpen}
			sideModal={true}
			title={"Account Information"}
		>
			<Box border="none" mb="none" padding="none">
				<React.Fragment key={id}>
					<Table>
						<tbody>
							<tr>
								<th>Surname</th>
								<td>
									{!state.editing ? (
										surname
									) : (
										<Input
											error={state.errors.surname}
											isRequired={true}
											name="surname"
											onChange={onChange}
											placeholder="Surname"
											type="text"
											validate={state.validate}
											value={state.user.surname}
										/>
									)}
								</td>
							</tr>
							<tr>
								<th>Forename</th>
								<td>
									{!state.editing ? (
										forename
									) : (
										<Input
											error={state.errors.forename}
											isRequired={true}
											name="forename"
											onChange={onChange}
											placeholder="Forename"
											type="text"
											validate={state.validate}
											value={state.user.forename}
										/>
									)}
								</td>
							</tr>
							<tr>
								<th>Email</th>
								<td>
									{!state.editing ? (
										email
									) : (
										<Input
											error={state.errors.email}
											isRequired={true}
											name="email"
											onChange={onChange}
											pattern={pattern.email}
											placeholder="Email Address"
											type="email"
											validate={state.validate}
											value={state.user.email}
										/>
									)}
								</td>
							</tr>
						</tbody>
					</Table>
					<Mutation
						mutation={gql`
							mutation updateUser($input: UpdateUserInput!) {
								updateUser(input: $input)
							}
						`}
						variables={{ input: { id, forename, surname, email } }}
					>
						{mutation => (
							<TableAction
								onClick={
									state.editing
										? () => updateUser(mutation)
										: () => setState({ ...state, editing: true })
								}
							>
								{state.editing ? "Save" : "Edit"} Details
							</TableAction>
						)}
					</Mutation>
					<Paragraph light>
						This user account is {active ? "activated" : "deactivated"}. A
						deactivated account is prevented from logging into the portal and
						retrieving sensitive information from the application APIs, even
						when authenticated.
					</Paragraph>
					<Mutation
						mutation={gql`
							mutation ${active ? "deactivateUser" : "activateUser"}($id: ID!) {
								${active ? "deactivateUser" : "activateUser"}(id: $id)
							}
						`}
						variables={{ id }}
					>
						{mutation => (
							<Query
								query={gql`
									{
										currentUser {
											id
										}
									}
								`}
							>
								{({ loading, error, data }) => (
									<Button
										disabled={loading || error || data.currentUser.id === id}
										onClick={
											active
												? () => deactivateUser(mutation)
												: () => activateUser(mutation)
										}
										secondary={active}
									>
										{active ? "Deactivate" : "Activate"} Account
									</Button>
								)}
							</Query>
						)}
					</Mutation>
				</React.Fragment>
			</Box>
		</Modal>
	);
};

AccountModal.propTypes = {
	close: PropType.func.isRequired,
	isOpen: PropType.bool.isRequired,
	user: PropType.any
};

export default AccountModal;
