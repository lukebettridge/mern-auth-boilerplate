import styled, { css } from "styled-components";

const Input = styled.input`
	background-color: transparent;
	border: 0;
	border-bottom: 1px solid #e9ecef;
	font-size: 11pt;
	font-weight: 300;
	max-width: 350px;
	outline: none;
	padding: 12px 10px;
	width: 100%;

	${props =>
		props.inError &&
		css`
			border-color: #db1802;
		`}

	${props =>
		props.small &&
		css`
			font-size: 10pt;
		`}
`;

const InputContainer = styled.div`
	margin-bottom: 10px;
	width: 100%;

	${props =>
		props.mb === "none" &&
		css`
			margin-bottom: 0;
		`}

	${props =>
		props.mb === "m" &&
		css`
			margin-bottom: 24px;
		`}
`;

const Error = styled.p`
	color: #db1802;
	font-size: 10pt;
	font-weight: 300;
	margin: 10px auto;
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

export { Input, InputContainer, Error };
