import React, { useEffect, useState } from "react";
import PropType from "prop-types";
import axios from "axios";

import { pattern } from "utils";
import { Box, Paragraph } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";

const ResetPasswordModal = props => {
	const initialState = {
		email: "",
		errors: {},
		success: false,
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

	const onSubmit = e => {
		e.preventDefault();
		setState(prev => ({ ...prev, errors: {}, validate: true }));

		axios
			.get(`/api/auth/reset-password?email=${state.email}`, {
				baseURL,
				withCredentials: true
			})
			.then(() => {
				setState(prev => ({ ...prev, success: true }));
				props.close();
			})
			.catch(err => {
				setState(prev => ({
					...prev,
					errors: err.response.data
				}));
			});
	};

	return (
		<Modal close={props.close} isOpen={props.isOpen}>
			<Box border="none" mb="none" padding="none">
				<Paragraph mb="l">
					Enter the email address associated with your account and click submit.
					An email will be sent to you with a link to reset your password.
				</Paragraph>
				<form noValidate onSubmit={onSubmit}>
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
					<Button maxWidth="350px" type="submit">
						Submit
					</Button>
				</form>
			</Box>
		</Modal>
	);
};

ResetPasswordModal.propTypes = {
	close: PropType.func.isRequired,
	isOpen: PropType.bool.isRequired
};

export default ResetPasswordModal;
