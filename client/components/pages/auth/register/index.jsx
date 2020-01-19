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
			setState(prev => ({ ...prev, validate: false }));
		}
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
			.post(
				`/api/auth/register`,
				{
					forename: state.forename,
					surname: state.surname,
					email: state.email,
					password: state.password,
					password2: state.password2
				},
				{ baseURL: process.env.BASE_URL }
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
					Use the form below to register for an account. Once approved, you will
					receive an email with instructions on how to set your password.
				</Paragraph>
				<form noValidate onSubmit={onSubmit}>
					<Input
						error={state.errors.email}
						isRequired={true}
						label="Email Address"
						name="email"
						onChange={onChange}
						pattern={pattern.email}
						type="email"
						validate={state.validate}
						value={state.email}
					/>
					<Input
						error={state.errors.forename}
						isRequired={true}
						label="Forename"
						name="forename"
						onChange={onChange}
						validate={state.validate}
						value={state.forename}
					/>
					<Input
						error={state.errors.surname}
						isRequired={true}
						label="Surname"
						name="surname"
						onChange={onChange}
						validate={state.validate}
						value={state.surname}
					/>
					<Input
						error={state.errors.password}
						isRequired={true}
						label={"Password"}
						name="password"
						onChange={onChange}
						type="password"
						validate={state.validate}
						value={state.password}
					/>
					<Input
						error={state.errors.password2}
						friendlyName={"Confirm password"}
						isRequired={true}
						label={"Confirm Password"}
						mb="m"
						name="password2"
						onChange={onChange}
						type="password"
						validate={state.validate}
						value={state.password2}
					/>
					<Button type="submit">Register</Button>
				</form>
				<RouterLink to="/auth/login">Go back to login</RouterLink>
			</Box>
		</Layout>
	);
};

export default Register;
