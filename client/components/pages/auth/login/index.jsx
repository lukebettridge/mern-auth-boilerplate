import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { pattern } from "client/utils";
import { Box, Link, Paragraph, RouterLink } from "components/styles";
import Layout from "../Layout";
import Input from "components/form/input";
import { Error } from "components/form/input/styles";
import Button from "components/form/button";
import ResetPasswordModal from "./ResetPasswordModal";

import * as utils from "./utils";

const Login = () => {
	const history = useHistory();
	const [state, setState] = useState({
		email: "",
		errors: {},
		modalIsOpen: false,
		password: ""
	});
	const refs = {};
	["email", "password"].forEach(name => (refs[name] = useRef()));

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
		utils.login(
			{ email: state.email, password: state.password },
			() => {
				history.push("/home");
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
							ref={refs.email}
							type="email"
							value={state.email}
						/>
						<Input
							error={state.errors.password}
							isRequired={true}
							label="Password"
							mb="m"
							name="password"
							onChange={onChange}
							ref={refs.password}
							type="password"
							value={state.password}
						/>
						<Button type="submit">Submit</Button>
						{state.errors.error && <Error>{state.errors.error}</Error>}
					</form>
					<Link
						onClick={() => setState(prev => ({ ...prev, modalIsOpen: true }))}
						secondary
					>
						Forgotten your password?
					</Link>
					<RouterLink to="/auth/register">Create an account</RouterLink>
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
