import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { pattern } from "client/utils";
import { Paragraph } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";
import { Error } from "components/form/input/styles";

import * as utils from "./utils";

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
		utils.resetPassword(
			state.email,
			() => {
				setState(prev => ({ ...prev, success: true }));
				props.close();
			},
			err => {
				if (err.response) {
					setState(prev => ({
						...prev,
						errors: err.response.data
					}));
				}
			}
		);
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
				{state.errors.error && <Error>{state.errors.error}</Error>}
			</form>
		</Modal>
	);
};

ResetPasswordModal.propTypes = {
	close: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired
};

export default ResetPasswordModal;
