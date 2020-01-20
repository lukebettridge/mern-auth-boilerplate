import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { Paragraph } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";

const ChangePasswordModal = props => {
	const initialState = {
		password: "",
		newPassword: "",
		newPassword2: "",
		errors: {}
	};
	const [state, setState] = useState(initialState);
	const refs = {};
	["password", "newPassword", "newPassword2"].forEach(
		name => (refs[name] = useRef())
	);

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

	const changePassword = mutation => {
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

	const { password, newPassword, newPassword2 } = state;

	return (
		<Modal close={props.close} isOpen={props.isOpen}>
			<Paragraph center mb="l">
				Enter your current password, followed by what you&apos;d like to change
				it to and a confirmation of that new password. Once successful, you will
				need to use the new password the next time you login.
			</Paragraph>
			<form noValidate onSubmit={e => e.preventDefault()}>
				<Input
					error={state.errors.password}
					isRequired={true}
					label="Password"
					name="password"
					onChange={onChange}
					ref={refs.password}
					type="password"
					value={state.password}
				/>
				<Input
					error={state.errors.newPassword}
					friendlyName="New password"
					isRequired={true}
					label="New Password"
					name="newPassword"
					onChange={onChange}
					ref={refs.newPassword}
					type="password"
					value={state.newPassword}
				/>
				<Input
					error={state.errors.newPassword2}
					friendlyName={"Confirm new password"}
					isRequired={true}
					label="Confirm New Password"
					mb="m"
					name="newPassword2"
					onChange={onChange}
					ref={refs.newPassword2}
					type="password"
					value={state.newPassword2}
				/>
				<Mutation
					mutation={gql`
						mutation changePassword($input: ChangePasswordInput!) {
							changePassword(input: $input)
						}
					`}
					variables={{ input: { password, newPassword, newPassword2 } }}
				>
					{(mutation, { loading }) => (
						<Button
							disabled={loading}
							onClick={!loading ? () => changePassword(mutation) : null}
						>
							Submit
						</Button>
					)}
				</Mutation>
			</form>
		</Modal>
	);
};

ChangePasswordModal.propTypes = {
	close: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired
};

export default ChangePasswordModal;
