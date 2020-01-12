import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { Box, Paragraph } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";

const ChangePasswordModal = props => {
	const initialState = {
		password: "",
		newPassword: "",
		newPassword2: "",
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

	const { password, newPassword, newPassword2 } = state;

	return (
		<Modal close={props.close} isOpen={props.isOpen}>
			<Paragraph center mb="l">
				Enter your current password, followed by what you&apos;d like to change
				it to and a confirmation of that new password. Once successful, you will
				need to use the new password the next time you login.
			</Paragraph>
			<Mutation
				mutation={gql`
					mutation changePassword($input: ChangePasswordInput!) {
						changePassword(input: $input)
					}
				`}
				variables={{ input: { password, newPassword, newPassword2 } }}
			>
				{mutation => (
					<form noValidate onSubmit={e => onSubmit(e, mutation)}>
						<Input
							error={state.errors.password}
							isRequired={true}
							label="Password"
							name="password"
							onChange={onChange}
							type="password"
							validate={state.validate}
							value={state.password}
						/>
						<Input
							error={state.errors.newPassword}
							friendlyName="New password"
							isRequired={true}
							label="New Password"
							name="newPassword"
							onChange={onChange}
							type="password"
							validate={state.validate}
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
							type="password"
							validate={state.validate}
							value={state.newPassword2}
						/>
						<Button type="submit">Submit</Button>
					</form>
				)}
			</Mutation>
		</Modal>
	);
};

ChangePasswordModal.propTypes = {
	close: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired
};

export default ChangePasswordModal;
