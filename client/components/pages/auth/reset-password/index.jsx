import React, { useState } from "react";
import PropType from "prop-types";
import axios from "axios";

import Layout from "../Layout";
import { Box, Paragraph } from "components/styles";
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

	const onChange = e =>
		setState({
			...state,
			[e.target.name]: e.target.value
		});

	const onSubmit = e => {
		e.preventDefault();
		setState({ ...state, validate: true });

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
				setState({ ...state, success: true });
			})
			.catch(err => {
				setState({
					...state,
					errors: err.response.data
				});
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
						name="newPassword"
						onChange={onChange}
						placeholder={"New Password"}
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
						placeholder={"Confirm New Password"}
						type="password"
						validate={state.validate}
						value={state.newPassword2}
					/>
					<Button type="submit">Submit</Button>
					{state.errors.resetKey && (
						<Error mt="s">{state.errors.resetKey}</Error>
					)}
				</form>
				{state.success && <p>Success!</p>}
				<Button as="a" href="/auth/login" mt="s" type="text">
					Go back to login
				</Button>
			</Box>
		</Layout>
	);
};

ResetPassword.propTypes = {
	match: PropType.any
};

export default ResetPassword;
