import styled, { css } from "styled-components";
import breakpoints from "components/styles/breakpoints";

const Error = styled.p`
	color: #db1802;
	font-size: 10pt;
	font-weight: 300;
	margin-bottom: 16px;
	margin-top: 0;
	&:first-letter {
		text-transform: capitalize;
	}
`;

const Input = styled.input`
	background-color: transparent;
	border: 0;
	border-bottom: 1px solid #e9ecef;
	box-shadow: none;
	font-size: 11pt;
	font-weight: 300;
	margin-bottom: 8px;
	outline: none;
	padding: 12px 10px;
	width: 100%;

	&:focus + label {
		font-size: 75%;
		transform: translate3d(0, -100%, 0);
		opacity: 1;
	}

	${props =>
		props.value &&
		css`
			& + label {
				font-size: 75%;
				transform: translate3d(0, -100%, 0);
				opacity: 1;
			}
		`}

	${props =>
		props.inError &&
		css`
			border-color: #db1802;

			& + label {
				color: #db1802;
			}
		`}
`;

const InputContainer = styled.div`
	position: relative;
	width: 100%;

	@media (min-width: ${breakpoints.m}) {
		min-width: 250px;
	}

	${props =>
		props.label &&
		css`
			margin-top: 20px;
		`}

	${props =>
		props.mb &&
		css`
			margin-bottom: 30px;
		`}
`;

const Label = styled.label`
	left: 0;
	opacity: 0.5;
	font-weight: 300;
	padding-left: 10px;
	padding-top: 10px;
	position: absolute;
	top: 0;
	transition: all 200ms;
`;

export { Error, Input, InputContainer, Label };
