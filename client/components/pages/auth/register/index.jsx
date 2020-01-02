import React, { useEffect, useState } from "react";
import axios from "axios";

import { pattern } from "utils";
import { Box, Paragraph, RouterLink } from "components/styles";
import Layout from "../Layout";
import Input from "components/form/input";
import Button from "components/form/button";

const Register = () => {
	const [state, setState] = useState({
		email: "",
		errors: {},
		forename: "",
		password: "",
		password2: "",
		success: false,
		surname: "",
		validate: false
	});

	useEffect(() => {
		if (state.validate) {
			setState({ ...state, validate: false });
		}
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
			.post(
				`/api/auth/register`,
				{
					forename: state.forename,
					surname: state.surname,
					email: state.email,
					password: state.password,
					password2: state.password2
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
					Use the form below to register for an account. Once approved, you will
					receive an email with instructions on how to set your password.
				</Paragraph>
				<form noValidate onSubmit={onSubmit}>
					<Input
						error={state.errors.email}
						isRequired={true}
						name="email"
						onChange={onChange}
						pattern={pattern.email}
						placeholder="Email Address"
						type="email"
						validate={state.validate}
						value={state.email}
					/>
					<Input
						error={state.errors.forename}
						isRequired={true}
						name="forename"
						onChange={onChange}
						placeholder="Forename"
						validate={state.validate}
						value={state.forename}
					/>
					<Input
						error={state.errors.surname}
						isRequired={true}
						name="surname"
						onChange={onChange}
						placeholder="Surname"
						validate={state.validate}
						value={state.surname}
					/>
					<Input
						error={state.errors.password}
						isRequired={true}
						name="password"
						onChange={onChange}
						placeholder={"Password"}
						type="password"
						validate={state.validate}
						value={state.password}
					/>
					<Input
						error={state.errors.password2}
						friendlyName={"Confirm password"}
						isRequired={true}
						mb="m"
						name="password2"
						onChange={onChange}
						placeholder={"Confirm Password"}
						type="password"
						validate={state.validate}
						value={state.password2}
					/>
					<Button type="submit" width="100%">
						Register
					</Button>
				</form>
				{state.success && <p>Success!</p>}
				<RouterLink mt="l" to="/auth/login">
					Go back to login
				</RouterLink>
			</Box>
		</Layout>
	);
};

export default Register;
