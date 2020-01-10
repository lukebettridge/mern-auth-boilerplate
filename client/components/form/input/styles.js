import styled, { css } from "styled-components";

const Error = styled.p`
	color: #db1802;
	font-size: 10pt;
	font-weight: 300;
	margin: 10px auto 0;
	max-width: 350px;
	&:first-letter {
		text-transform: capitalize;
	}

	${props =>
		props.mt === "none" &&
		css`
			margin-top: 0;
		`}

	${props =>
		props.mt === "s" &&
		css`
			margin-top: 16px;
		`}

	${props =>
		props.mb === "s" &&
		css`
			margin-bottom: 16px;
		`}
`;

const Input = styled.input`
	background-color: transparent;
	border: 0;
	border-bottom: 1px solid #e9ecef;
	box-shadow: none;
	font-size: 11pt;
	font-weight: 300;
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

	${props =>
		props.small &&
		css`
			font-size: 10pt;
		`}
`;

const InputContainer = styled.div`
	max-width: 350px;
	position: relative;
	width: 100%;

	${props =>
		!props.inline &&
		css`
			margin: 0 auto 10px auto;
		`}

	${props =>
		props.label &&
		props.mt !== "none" &&
		css`
			margin-top: 25px;
		`}

	${props =>
		props.mb === "m" &&
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
