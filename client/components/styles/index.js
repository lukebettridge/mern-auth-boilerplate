import styled, { css } from "styled-components";
import breakpoints from "./breakpoints";

const Box = styled.div`
	background-color: #eeeeee;
	border-radius: 4px;
	color: #666666;
	margin-bottom: 20px;
	padding: 40px;
	text-align: center;

	@media (min-width: ${breakpoints.m}) {
		padding: 54px;
	}

	${props =>
		props.blue &&
		css`
			background-color: #354a5f;
			color: #ffffff;
		`}

	${props =>
		props.mb === "none" &&
		css`
			margin-bottom: 0;
		`}

	${props =>
		props.padding === "none" &&
		css`
			padding: 0 !important;
		`}
`;

const Container = styled.div`
	margin: 0 auto;
	padding: 32px 0;

	@media (min-width: ${breakpoints.m}) {
		padding: 32px 48px;
	}

	${props =>
		props.small &&
		css`
			max-width: 540px;
			@media (min-width: ${breakpoints.m}) {
				max-width: 650px;
			}
		`}
`;

const Heading = styled.h1`
	color: #212529;
	font-size: 30pt;
	font-weight: 900;
	letter-spacing: -1px;
	margin-top: 0;
	margin-bottom: 32px;
`;

const Paragraph = styled.p`
	font-weight: 200;
	margin-top: 0;
	margin-bottom: 16px;

	${props =>
		props.light &&
		css`
			color: #cccccc;
			font-size: 10pt;
		`}

	${props =>
		props.center &&
		css`
			text-align: center;
		`}

	${props =>
		props.mt === "l" &&
		css`
			margin-top: 35px;
		`}

	${props =>
		props.mb === "l" &&
		css`
			margin-bottom: 35px;
		`}

	a {
		color: inherit;
		text-decoration: none;
		&:hover {
			text-decoration underline;
		}
	}
`;

const Subheading = styled.h2`
	font-size: 24pt;
	font-weight: 700;
	margin-top: 0;
	margin-bottom: 30px;
`;

module.exports = {
	Box,
	Container,
	Heading,
	Paragraph,
	Subheading
};
