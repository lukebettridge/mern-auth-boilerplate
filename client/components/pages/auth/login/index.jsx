import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { pattern } from "utils";
import { Box, Link, Paragraph, RouterLink } from "components/styles";
import Layout from "../Layout";
import Input from "components/form/input";
import { Error } from "components/form/input/styles";
import Button from "components/form/button";
import ResetPasswordModal from "./ResetPasswordModal";

const Login = () => {
	const history = useHistory();
	const [state, setState] = useState({
		email: "",
		errors: {},
		modalIsOpen: false,
		password: "",
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
				`/api/auth/login`,
				{
					email: state.email,
					password: state.password
				},
				{
					baseURL,
					withCredentials: true
				}
			)
			.then(() => {
				document.cookie = "authenticated=true;path=/";
				history.push("/home");
			})
			.catch(err => {
				setState(prev => ({
					...prev,
					errors: err.response.data
				}));
			});
	};

	return (
		<React.Fragment>
			<Layout>
				<Box>
					<Paragraph mb="l">
						Fill out the form below and click submit to login to the portal. If
						you don&apos;t have an account, request access by creating one using
						the link below.
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
							error={state.errors.password}
							isRequired={true}
							label="Password"
							mb="m"
							name="password"
							onChange={onChange}
							type="password"
							validate={state.validate}
							value={state.password}
						/>
						<Button maxWidth="350px" type="submit">
							Submit
						</Button>
						{state.errors.error && <Error mb="s">{state.errors.error}</Error>}
						<Link
							onClick={() => setState(prev => ({ ...prev, modalIsOpen: true }))}
							secondary
						>
							Forgotten your password?
						</Link>
					</form>
					<RouterLink mt="l" to="/auth/register">
						Create an account
					</RouterLink>
				</Box>
			</Layout>
			<ResetPasswordModal
				close={() => setState(prev => ({ ...prev, modalIsOpen: false }))}
				isOpen={state.modalIsOpen}
			/>
		</React.Fragment>
	);
};

export default Login;
