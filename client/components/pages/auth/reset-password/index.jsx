import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Layout from "../Layout";
import { Box, Paragraph, RouterLink } from "components/styles";
import Input from "components/form/input";
import { Error } from "components/form/input/styles";
import Button from "components/form/button";

const ResetPassword = props => {
	const [state, setState] = useState({
		errors: {},
		newPassword: "",
		newPassword2: "",
		success: false,
		validate: false
	});

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
			.post(
				`/api/auth/reset-password`,
				{
					resetKey: props.match.params.resetKey,
					newPassword: state.newPassword,
					newPassword2: state.newPassword2
				},
				{ baseURL }
			)
			.then(() => {
				setState(prev => ({ ...prev, success: true }));
			})
			.catch(err => {
				setState(prev => ({
					...prev,
					errors: err.response.data
				}));
			});
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
						type="password"
						validate={state.validate}
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
						type="password"
						validate={state.validate}
						value={state.newPassword2}
					/>
					<Button maxWidth="350px" type="submit">
						Submit
					</Button>
					{state.errors.resetKey && (
						<Error mb="s">{state.errors.resetKey}</Error>
					)}
				</form>
				{state.success && <p>Success!</p>}
				<RouterLink mt="l" to="/auth/login">
					Go back to login
				</RouterLink>
			</Box>
		</Layout>
	);
};

ResetPassword.propTypes = {
	match: PropTypes.any
};

export default ResetPassword;
