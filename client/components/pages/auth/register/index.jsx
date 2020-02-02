import React, { useRef, useState } from "react";
import axios from "axios";

import { pattern } from "client/utils";
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
		surname: ""
	});
	const refs = {};
	["email", "forename", "surname", "password", "password2"].forEach(
		name => (refs[name] = useRef())
	);

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
						ref={refs.email}
						type="email"
						value={state.email}
					/>
					<Input
						error={state.errors.forename}
						isRequired={true}
						label="Forename"
						name="forename"
						onChange={onChange}
						ref={refs.forename}
						value={state.forename}
					/>
					<Input
						error={state.errors.surname}
						isRequired={true}
						label="Surname"
						name="surname"
						onChange={onChange}
						ref={refs.surname}
						value={state.surname}
					/>
					<Input
						error={state.errors.password}
						isRequired={true}
						label={"Password"}
						name="password"
						onChange={onChange}
						ref={refs.password}
						type="password"
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
						ref={refs.password2}
						type="password"
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
