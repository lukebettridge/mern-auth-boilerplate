import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Mutation, Query } from "react-apollo";
import { gql } from "apollo-boost";

import { pattern } from "utils";
import { Box, FlexBox, Paragraph } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";

const AccountModal = props => {
	const initialState = {
		editing: false,
		email: "",
		errors: {},
		user: props.user || {},
		validate: false
	};
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (props.isOpen) setState(initialState);
		else setState(prev => ({ ...prev, user: {} }));
	}, [props.isOpen]);

	useEffect(() => {
		if (state.validate) setState(prev => ({ ...prev, validate: false }));
	}, [state.validate]);

	const onChange = e => {
		const { name, value } = e.target;
		setState(prev => ({
			...prev,
			user: {
				...prev.user,
				[name]: value
			}
		}));
	};

	const updateUser = mutation => {
		setState(prev => ({ ...prev, errors: {}, validate: true }));

		mutation()
			.then(() => {
				setState(prev => ({ ...prev, editing: false }));
				props.onSuccess();
			})
			.catch(err => {
				if (err.graphQLErrors) {
					const errors = err.graphQLErrors[0];
					setState(prev => ({ ...prev, errors }));
				}
			});
	};

	const deactivateUser = mutation => {
		mutation().then(({ data }) => {
			setState(prev => ({
				...prev,
				user: {
					...prev.user,
					active: data.deactivateUser
				}
			}));
			props.onSuccess();
		});
	};

	const activateUser = mutation => {
		mutation().then(({ data }) => {
			setState(prev => ({
				...prev,
				user: {
					...prev.user,
					active: data.activateUser
				}
			}));
			props.onSuccess();
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
			<form noValidate>
				<FlexBox>
					<Input
						error={state.errors.surname}
						isRequired={true}
						label="Surname"
						name="surname"
						onChange={onChange}
						validate={state.validate}
						value={state.user.surname}
					/>
					<Input
						error={state.errors.forename}
						isRequired={true}
						label="Forename"
						name="forename"
						onChange={onChange}
						validate={state.validate}
						value={state.user.forename}
					/>
				</FlexBox>
				<Input
					error={state.errors.email}
					isRequired={true}
					label="Email Address"
					mb="m"
					name="email"
					onChange={onChange}
					pattern={pattern.email}
					type="email"
					validate={state.validate}
					value={state.user.email}
				/>
				<Mutation
					mutation={gql`
						mutation updateUser($input: UpdateUserInput!) {
							updateUser(input: $input)
						}
					`}
					variables={{ input: { id, forename, surname, email } }}
				>
					{(mutation, { loading }) => (
						<Button
							disabled={loading}
							onClick={!loading ? () => updateUser(mutation) : null}
							width="auto"
						>
							Save Details
						</Button>
					)}
				</Mutation>
			</form>
			<Paragraph center light>
				This user account is {active ? "activated" : "deactivated"}. A
				deactivated account is prevented from logging into the portal and
				retrieving sensitive information from the application APIs, even when
				authenticated.
			</Paragraph>
			<Mutation
				mutation={gql`
							mutation ${active ? "deactivateUser" : "activateUser"}($id: ID!) {
								${active ? "deactivateUser" : "activateUser"}(id: $id)
							}
						`}
				variables={{ id }}
			>
				{(mutation, { loading }) => (
					<Query
						fetchPolicy={"no-cache"}
						query={gql`
							{
								currentUser {
									id
								}
							}
						`}
					>
						{query => (
							<Button
								disabled={
									loading ||
									query.loading ||
									query.error ||
									query.data.currentUser.id === id
								}
								onClick={
									!loading
										? active
											? () => deactivateUser(mutation)
											: () => activateUser(mutation)
										: null
								}
								secondary={active}
							>
								{active ? "Deactivate" : "Activate"} Account
							</Button>
						)}
					</Query>
				)}
			</Mutation>
		</Modal>
	);
};

AccountModal.propTypes = {
	close: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired,
	user: PropTypes.any
};

export default AccountModal;
