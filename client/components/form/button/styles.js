import styled, { css } from "styled-components";

const Button = styled.button`
	background-color: #1188e6;
	border: 1px solid #1288e5;
	border-radius: 2px;
	color: #ffffff;
	cursor: pointer;
	font-size: 10pt;
	font-weight: 300;
	outline-width: 3px;
	padding: 10px 20px;
	transition: background-color .3s;

	&:disabled {
		cursor: unset;
		opacity: .4;
	}

	${props =>
		props.secondary &&
		css`
			background-color: transparent;
			border: 1px solid #a3cdf3;
			color: #1a82e2;

			&:hover:not(:disabled) {
				background-color: #e8f2fc;
			}
		`}

	${props =>
		props.inline
			? css`
					margin-left: 15px;
			  `
			: css`
					width: 100%;
			  `}

		${props =>
			props.maxWidth &&
			css`
				max-width: ${props.maxWidth};
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

module.exports = { Button };
