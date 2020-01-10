import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import { Box } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import { Error } from "components/form/input/styles";
import Button from "components/form/button";

const ChangePasswordModal = props => {
	const initialState = {
		password: "",
		newPassword: "",
		newPassword2: "",
		errors: {},
		success: false,
		validate: false
	};
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (props.isOpen) setState(initialState);
	}, [props.isOpen]);

	useEffect(() => {
		if (state.validate) setState({ ...state, validate: false });
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
		setState({ ...state, validate: true });

		mutation()
			.then(() => {
				setState({ ...state, success: true });
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
			<Box border="none" mb="none" padding="none">
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
								name="password"
								onChange={onChange}
								placeholder="Password"
								type="password"
								validate={state.validate}
								value={state.password}
							/>
							<Input
								error={state.errors.newPassword}
								friendlyName="New password"
								isRequired={true}
								name="newPassword"
								onChange={onChange}
								placeholder="New Password"
								type="password"
								validate={state.validate}
								value={state.newPassword}
							/>
							<Input
								error={state.errors.newPassword2}
								friendlyName={"Confirm new password"}
								isRequired={true}
								mb="m"
								name="newPassword2"
								onChange={onChange}
								placeholder="Confirm New Password"
								type="password"
								validate={state.validate}
								value={state.newPassword2}
							/>
							<Button maxWidth="350px" type="submit">
								Submit
							</Button>
							{state.errors.message && <Error>{state.errors.message}</Error>}
						</form>
					)}
				</Mutation>
			</Box>
		</Modal>
	);
};

ChangePasswordModal.propTypes = {
	close: PropType.func.isRequired,
	isOpen: PropType.bool.isRequired
};

export default ChangePasswordModal;
