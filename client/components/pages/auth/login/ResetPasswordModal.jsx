import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { pattern } from "utils";
import { Paragraph } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";

const ResetPasswordModal = props => {
	const initialState = {
		email: "",
		errors: {},
		success: false
	};
	const [state, setState] = useState(initialState);
	const refs = { email: useRef() };

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

	const onSubmit = e => {
		e.preventDefault();

		let isValid = true;
		setState(prev => ({ ...prev, errors: {} }));
		for (const [, ref] of Object.entries(refs))
			if (ref.current.validate().length) isValid = false;

		if (!isValid) return;
		axios
			.get(`/api/auth/reset-password?email=${state.email}`, {
				baseURL: process.env.BASE_URL,
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
					ref={refs.email}
					type="email"
					value={state.email}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Modal>
	);
};

ResetPasswordModal.propTypes = {
	close: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired
};

export default ResetPasswordModal;
