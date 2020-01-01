import styled, { css } from "styled-components";

const Input = styled.input`
	border: 1px solid #eeeeee;
	border-radius: 3px;
	font-size: 12pt;
	margin-bottom: 10px;
	max-width: 350px;
	outline-width: 2px;
	padding: 10px;
	width: 100%;

	${props =>
		props.mb === "none" &&
		css`
			margin-bottom: 0;
		`}

	${props =>
		props.mb === "s" &&
		css`
			margin-bottom: 16px;
		`}
`;

const Error = styled.p`
	color: #db1802;
	font-size: 10pt;
	font-weight: 300;
	margin: -4px auto 16px;
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
`;

module.exports = { Input, Error };
