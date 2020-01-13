import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { pattern } from "utils";
import { FlexBox, Link, Paragraph } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";

const AccountModal = props => {
	const initialState = {
		email: "",
		errors: {},
		new: false,
		user: props.user || {
			forename: "",
			surname: "",
			email: "",
			password: "",
			password2: ""
		},
		validate: false
	};
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (props.isOpen) setState({ ...initialState, new: !props.user });
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

	const saveUser = mutation => {
		setState(prev => ({ ...prev, errors: {}, validate: true }));

		mutation()
			.then(() => {
				props.onSuccess();
				if (state.new) props.close();
			})
			.catch(err => {
				if (err.graphQLErrors.length > 0) {
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

	const {
		id,
		forename,
		surname,
		email,
		password,
		password2,
		active
	} = state.user;

	return (
		<Modal
			close={props.close}
			isOpen={props.isOpen}
			sideModal={true}
			title={state.new ? "New Account" : "Account Information"}
		>
			<form noValidate>
				<FlexBox>
					<Input
						error={state.errors.forename}
						isRequired={true}
						label="Forename"
						name="forename"
						onChange={onChange}
						validate={state.validate}
						value={state.user.forename}
					/>
					<Input
						error={state.errors.surname}
						isRequired={true}
						label="Surname"
						name="surname"
						onChange={onChange}
						validate={state.validate}
						value={state.user.surname}
					/>
				</FlexBox>
				<Input
					error={state.errors.email}
					isRequired={true}
					label="Email Address"
					mb={!state.new ? "m" : ""}
					name="email"
					onChange={onChange}
					pattern={pattern.email}
					type="email"
					validate={state.validate}
					value={state.user.email}
				/>
				{state.new && (
					<FlexBox>
						<Input
							error={state.errors.password}
							isRequired={true}
							label={"Password"}
							name="password"
							onChange={onChange}
							type="password"
							validate={state.validate}
							value={state.user.password}
						/>
						<Input
							error={state.errors.password2}
							friendlyName={"Confirm password"}
							isRequired={true}
							label={"Confirm Password"}
							mb="m"
							name="password2"
							onChange={onChange}
							type="password"
							validate={state.validate}
							value={state.user.password2}
						/>
					</FlexBox>
				)}
				<Mutation
					mutation={
						state.new
							? gql`
									mutation addUser($input: AddUserInput!) {
										addUser(input: $input)
									}
							  `
							: gql`
									mutation updateUser($input: UpdateUserInput!) {
										updateUser(input: $input)
									}
							  `
					}
					variables={{
						input: { id, forename, surname, email, password, password2 }
					}}
				>
					{(mutation, { loading }) => (
						<Button
							disabled={loading}
							onClick={!loading ? () => saveUser(mutation) : null}
						>
							Save
						</Button>
					)}
				</Mutation>
			</form>
			{!state.new && (
				<React.Fragment>
					<Paragraph center light>
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
						{(mutation, { loading }) => (
							<Link
								center
								disabled={loading || props.currentUser.id === id}
								onClick={
									!loading && props.currentUser.id !== id
										? active
											? () => deactivateUser(mutation)
											: () => activateUser(mutation)
										: null
								}
								secondary={active}
							>
								{active ? "Deactivate" : "Activate"} account
							</Link>
						)}
					</Mutation>
				</React.Fragment>
			)}
		</Modal>
	);
};

AccountModal.propTypes = {
	close: PropTypes.func.isRequired,
	currentUser: PropTypes.object,
	isOpen: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired,
	user: PropTypes.any
};

export default AccountModal;
