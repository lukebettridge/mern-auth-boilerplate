import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { pattern } from "utils";
import { Paragraph } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";

const EditProfileModal = props => {
	const initialState = {
		...props.currentUser,
		errors: {},
		validate: false
	};
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (props.isOpen) setState(initialState);
	}, [props.isOpen]);

	useEffect(() => {
		if (state.validate) setState(prev => ({ ...prev, validate: false }));
	}, [state.validate]);

	const onChange = e => {
		const { name, value } = e.target;
		setState(prev => ({
			...prev,
			[name]: value
		}));
	};

	const onSubmit = (e, mutation) => {
		e.preventDefault();
		setState(prev => ({ ...prev, errors: {}, validate: true }));

		mutation()
			.then(() => {
				props.onSuccess();
				props.close();
			})
			.catch(err => {
				const errors = err.graphQLErrors[0];
				setState(prev => ({ ...prev, errors }));
			});
	};

	const { forename, surname, email } = state;

	return (
		<Modal close={props.close} isOpen={props.isOpen}>
			<Paragraph center mb="l">
				Change your profile information by using the form below.
			</Paragraph>
			<Mutation
				mutation={gql`
					mutation updateCurrentUser($input: UpdateCurrentUserInput!) {
						updateCurrentUser(input: $input)
					}
				`}
				variables={{ input: { forename, surname, email } }}
			>
				{mutation => (
					<form noValidate onSubmit={e => onSubmit(e, mutation)}>
						<Input
							error={state.errors.forename}
							isRequired={true}
							label="Forename"
							name="forename"
							onChange={onChange}
							validate={state.validate}
							value={state.forename}
						/>
						<Input
							error={state.errors.surname}
							isRequired={true}
							label="Surname"
							name="surname"
							onChange={onChange}
							validate={state.validate}
							value={state.surname}
						/>
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
							value={state.email}
						/>
						<Button type="submit">Save</Button>
					</form>
				)}
			</Mutation>
		</Modal>
	);
};

EditProfileModal.propTypes = {
	close: PropTypes.func.isRequired,
	currentUser: PropTypes.shape({
		forename: PropTypes.string.isRequired,
		surname: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired
	}).isRequired,
	isOpen: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired
};

export default EditProfileModal;
