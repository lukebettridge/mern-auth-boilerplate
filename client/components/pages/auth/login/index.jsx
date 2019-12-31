import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { pattern } from "utils";
import { Box, Paragraph, Subheading } from "components/styles";
import Layout from "../Layout";
import Input from "components/form/input";
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
				setState({
					...state,
					errors: err.response.data
				});
			});
	};

	return (
		<React.Fragment>
			<Layout>
				<Box blue>
					<Subheading>
						Welcome to the
						<br />
						base Webapp
					</Subheading>
					<hr />
					<Paragraph>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</Paragraph>
				</Box>
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
							name="email"
							onChange={onChange}
							pattern={pattern.email}
							placeholder="Email Address"
							type="email"
							validate={state.validate}
							value={state.email}
						/>
						<Input
							error={state.errors.password}
							isRequired={true}
							mb="s"
							name="password"
							onChange={onChange}
							placeholder={"Password"}
							type="password"
							validate={state.validate}
							value={state.password}
						/>
						<Button type="submit">Submit</Button>
						<Button
							as="a"
							onClick={() => setState({ ...state, modalIsOpen: true })}
							secondary
						>
							Forgotten your password?
						</Button>
					</form>
					<Button as="a" href="/auth/register" mt="s">
						Create an account
					</Button>
				</Box>
			</Layout>
			<ResetPasswordModal
				close={() => setState({ ...state, modalIsOpen: false })}
				isOpen={state.modalIsOpen}
			/>
		</React.Fragment>
	);
};

export default Login;
