import styled, { css } from "styled-components";

const Button = styled.button`
	background-color: #f8f8f8;
	border: 1px solid #eeeeee;
	cursor: pointer;
	font-size: 13pt;
	font-weight: 600;
	max-width: 350px;
	padding: 8px 20px;
	width: 100%;

	${props =>
		props.as === "a" &&
		css`
			background-color: transparent;
			color: #596f86;
			display: block;
			font-weight: 400;
			max-width: none;
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}

			${props.secondary &&
				css`
					color: #aaaaaa;
					font-size: 11pt;
					font-weight: 300;
				`}
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
