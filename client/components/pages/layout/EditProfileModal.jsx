import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { pattern } from "client/utils";
import { Paragraph } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";

const EditProfileModal = props => {
	const initialState = {
		...props.currentUser,
		errors: {}
	};
	const [state, setState] = useState(initialState);
	const refs = {};
	["forename", "surname", "email"].forEach(name => (refs[name] = useRef()));

	useEffect(() => {
		if (props.isOpen) setState(initialState);
	}, [props.isOpen]);

	const onChange = e => {
		const { name, value } = e.target;
		setState(prev => ({
			...prev,
			[name]: value
		}));
	};

	const saveProfile = mutation => {
		let isValid = true;
		setState(prev => ({ ...prev, errors: {} }));
		for (const [, ref] of Object.entries(refs))
			if (ref.current.validate().length) isValid = false;

		if (!isValid) return;
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

			<form noValidate onSubmit={e => e.preventDefault()}>
				<Input
					error={state.errors.forename}
					isRequired={true}
					label="Forename"
					name="forename"
					onChange={onChange}
					ref={refs.forename}
					value={state.forename}
				/>
				<Input
					error={state.errors.surname}
					isRequired={true}
					label="Surname"
					name="surname"
					onChange={onChange}
					ref={refs.surname}
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
					ref={refs.email}
					type="email"
					value={state.email}
				/>
				<Mutation
					mutation={gql`
						mutation updateCurrentUser($input: UpdateCurrentUserInput!) {
							updateCurrentUser(input: $input)
						}
					`}
					variables={{ input: { forename, surname, email } }}
				>
					{(mutation, { loading }) => (
						<Button
							disabled={loading}
							onClick={!loading ? () => saveProfile(mutation) : null}
						>
							Save
						</Button>
					)}
				</Mutation>
			</form>
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
