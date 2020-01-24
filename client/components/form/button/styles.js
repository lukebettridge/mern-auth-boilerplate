import styled, { css } from "styled-components";

const Button = styled.button`
	align-items: center;
	background-color: #1188e6;
	border: 1px solid #1288e5;
	border-radius: 2px;
	color: #ffffff;
	cursor: pointer;
	display: flex;
	font-size: 10pt;
	font-weight: 300;
	justify-content: center;
	margin-bottom: 11px;
	outline-width: 3px;
	padding: 10px 17px;
	transition: background-color 0.3s;

	&:disabled {
		cursor: unset;
		opacity: 0.4;
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
		props.width
			? css`
					width: ${props.width};
			  `
			: css`
					width: 100%;
			  `}
`;

module.exports = { Button };
