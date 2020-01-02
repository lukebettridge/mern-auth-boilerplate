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
		if (state.validate) setState({ ...state, validate: false });
	}, [state.validate]);

	const onChange = e =>
		setState({
			...state,
			[e.target.name]: e.target.value
		});

	const onSubmit = e => {
		e.preventDefault();
		setState({ ...state, validate: true });

		axios
			.get(`/api/auth/reset-password?email=${state.email}`, {
				baseURL,
				withCredentials: true
			})
			.then(() => {
				setState({ ...state, success: true });
				props.close();
			})
			.catch(err => {
				setState({
					...state,
					errors: err.response.data
				});
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
						mb="m"
						name="email"
						onChange={onChange}
						pattern={pattern.email}
						placeholder="Email Address"
						type="email"
						validate={state.validate}
						value={state.email}
					/>
					<Button type="submit" width="350px">
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
