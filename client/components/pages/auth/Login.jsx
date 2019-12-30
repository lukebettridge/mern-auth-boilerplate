import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { pattern } from "../../../utils";
import { Box, Container, Heading, Paragraph, Subheading } from "../../styles";
import Input from "../../form/input";
import Button from "../../form/button";

const Login = () => {
	const history = useHistory();
	const [state, setState] = useState({
		email: "",
		password: "",
		errors: {},
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
				`${baseURL}/api/auth/login`,
				{
					email: state.email,
					password: state.password
				},
				{
					withCredentials: true
				}
			)
			.then(() => {
				document.cookie = "authenticated=true";
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
		<Container small>
			<Heading>Webapp</Heading>
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
				</form>
				<Button as="a" href="/register" mt="s" type="text">
					Create an account
				</Button>
			</Box>
			<Paragraph center light mt="l">
				Developed by{" "}
				<a
					href="https://paddl.co.uk/"
					rel="noopener noreferrer"
					target="_blank"
				>
					Paddl
				</a>
				.
				<br />
				Please report to us any errors or issues you have by using the flag icon
				that can be found at the bottom of every page.
			</Paragraph>
		</Container>
	);
};

export default Login;
