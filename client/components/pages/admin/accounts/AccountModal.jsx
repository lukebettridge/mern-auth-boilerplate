import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { pattern } from "client/utils";
import { FlexBox, Link, Paragraph } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Select from "components/form/select";
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
			password2: "",
			roles: []
		}
	};
	const [state, setState] = useState(initialState);
	const refs = {};
	["forename", "surname", "email", "password", "password2", "roles"].forEach(
		name => (refs[name] = useRef())
	);

	useEffect(() => {
		if (props.isOpen) setState({ ...initialState, new: !props.user });
		else setState(prev => ({ ...prev, user: {} }));
	}, [props.isOpen]);

	const onChange = e => {
		let { name, value } = e.target;

		if (name === "roles") {
			value = value?.map(opt => opt.value);
		}

		setState(prev => ({
			...prev,
			user: {
				...prev.user,
				[name]: value
			}
		}));
	};

	const saveUser = mutation => {
		let isValid = true;
		setState(prev => ({ ...prev, errors: {} }));
		for (const [name, ref] of Object.entries(refs))
			if (!["password", "password2"].includes(name) || state.new)
				if (ref.current.validate().length) isValid = false;

		if (!isValid) return;
		mutation()
			.then(() => {
				props.onSuccess();
				if (state.new) props.close();
			})
			.catch(err => {
				if (err.graphQLErrors?.length > 0) {
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

	const options = {
		roles: [
			{
				value: "admin",
				label: "Administrator",
				isFixed: props.currentUser.id === state.user.id
			},
			{ value: "user", label: "Guest" },
			{ value: "test", label: "Testing", isFixed: true }
		]
	};

	const {
		id,
		forename,
		surname,
		email,
		password,
		password2,
		active,
		roles
	} = state.user;

	return (
		<Modal
			close={props.close}
			isOpen={props.isOpen}
			sideModal={true}
			title={state.new ? "New Account" : "Account Information"}
		>
			<form noValidate onSubmit={e => e.preventDefault()}>
				<FlexBox>
					<Input
						error={state.errors.forename}
						isRequired={true}
						label="Forename"
						name="forename"
						onChange={onChange}
						ref={refs.forename}
						value={state.user.forename}
					/>
					<Input
						error={state.errors.surname}
						isRequired={true}
						label="Surname"
						name="surname"
						onChange={onChange}
						ref={refs.surname}
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
					ref={refs.email}
					type="email"
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
							ref={refs.password}
							type="password"
							value={state.user.password}
						/>
						<Input
							error={state.errors.password2}
							friendlyName={"Confirm password"}
							isRequired={true}
							label={"Confirm Password"}
							name="password2"
							onChange={onChange}
							ref={refs.password2}
							type="password"
							value={state.user.password2}
						/>
					</FlexBox>
				)}
				<Select
					isMulti
					label="Role"
					mb="m"
					name="roles"
					onChange={onChange}
					options={options.roles}
					ref={refs.roles}
					value={options.roles.filter(role => roles?.includes(role.value))}
				/>
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
						input: { id, forename, surname, email, password, password2, roles }
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
