import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import Layout from "../Layout";
import { Box, Paragraph, RouterLink } from "components/styles";
import Input from "components/form/input";
import { Error } from "components/form/input/styles";
import Button from "components/form/button";

import * as utils from "./utils";

const ResetPassword = props => {
	const [state, setState] = useState({
		errors: {},
		newPassword: "",
		newPassword2: "",
		success: false
	});
	const refs = {};
	["newPassword", "newPassword2"].forEach(name => (refs[name] = useRef()));

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
			{
				resetKey: props.match.params.resetKey,
				newPassword: state.newPassword,
				newPassword2: state.newPassword2
			},
			() => {
				setState(prev => ({ ...prev, success: true }));
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
		<Layout>
			<Box>
				<Paragraph mb="l">
					Fill out the form below and click submit to reset your password.
				</Paragraph>
				<form noValidate onSubmit={onSubmit}>
					<Input
						error={state.errors.newPassword}
						isRequired={true}
						label={"New Password"}
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
						label={"Confirm New Password"}
						mb="m"
						name="newPassword2"
						onChange={onChange}
						ref={refs.newPassword2}
						type="password"
						value={state.newPassword2}
					/>
					<Button type="submit">Submit</Button>
					{state.errors.resetKey && <Error>{state.errors.resetKey}</Error>}
				</form>
				<RouterLink to="/auth/login">Go back to login</RouterLink>
			</Box>
		</Layout>
	);
};

ResetPassword.propTypes = {
	match: PropTypes.any
};

export default ResetPassword;
