/* eslint-disable indent */
import styled, { css } from "styled-components";
import breakpoints from "./breakpoints";

import { Link as ReactRouterLink } from "react-router-dom";

const Box = styled.div`
	background-color: #ffffff;
	border: 1px solid #e9ecef;
	color: #666666;
	margin-bottom: 20px;
	padding: 40px 30px;
	text-align: center;

	@media (min-width: ${breakpoints.m}) {
		padding: 54px;
		padding-bottom: 50px;
	}

	${props =>
		props.grey &&
		css`
			background-color: #e8e8e8;
			border-color: #c3c3c3;

			hr {
				border-color: #e0e0e0;
			}
		`}

		${props =>
			props.border &&
			css`
				border: ${props.border};
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
	padding: 32px 15px;
	width: 100vw;

	@media (min-width: ${breakpoints.m}) {
		max-width: calc(100vw - 200px);
		padding: 32px 48px;
	}

	${props =>
		props.small &&
		css`
			max-width: 540px;
			@media (min-width: ${breakpoints.m}) {
				max-width: 700px;
			}
		`}

	${props =>
		props.tableCell &&
		css`
			display: table-cell;
		`}

		${props =>
			props.inactive &&
			css`
				opacity: 0.3;

				@media (min-width: ${breakpoints.m}) {
					opacity: 1;
				}
			`}
`;

const FilterWrap = styled.div`
	border: 1px solid #e9ecef;
	margin-bottom: 30px;
`;

const FilterHeader = styled.div`
	background-color: #f4f6f7;
	color: #546b81;
	border-bottom: 1px solid #e9ecef;
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
`;

const FilterBody = styled.div`
	background-color: #ffffff;
	display: flex;
	padding: 20px;
`;

const Heading = styled.h1`
	color: #212529;
	font-size: 30pt;
	font-weight: 900;
	letter-spacing: -1px;
	margin-top: 0;
	margin-bottom: 32px;
`;

const linkStyles = props => `
	color: #489be8;
	cursor: pointer;
	display: block;
	font-size: 11pt;
	font-weight: 300;
	margin: 10px;
	text-decoration: none;
	transition: opacity 0.3s;

	${
		props.secondary
			? css`
					color: #888888;
					opacity: 0.6;

					&:hover {
						opacity: 1;
					}
			  `
			: ""
	}

	${
		props.mt === "l"
			? css`
					margin-top: 35px;
			  `
			: ""
	}
	
`;

const Link = styled.a`
	${props => linkStyles(props)}
`;

const Paragraph = styled.p`
	font-weight: 300;
	line-height: 1.9;
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

const RouterLink = styled(ReactRouterLink)`
	${props => linkStyles(props)}
`;

const Table = styled.table`
	border-collapse: collapse;
	border-spacing: 0;
	color: #444444;
	width: 100%;

	thead {
		tr {
			background-color: transparent;
			border-color: transparent;

			th {
				color: #7f90a0;
				font-size: 9pt;
				letter-spacing: 1px;
				line-height: 15px;
				text-align: left;
				text-transform: uppercase;
			}
		}
	}

	tbody {
		tr {
			background-color: #ffffff;
			border: 1px solid #e9ecef;
			cursor: pointer;
			transition: background-color 0.3s;

			&:hover {
				background-color: #f4f6f7;
			}

			th {
				color: #546b81;
				text-align: left;
				text-transform: uppercase;
			}

			td {
				background-color: inherit;
			}
		}
	}

	tr {
		border-bottom: 0;
		font-size: 13px;
		line-height: 20px;
	}

	th,
	td {
		border: 0;
		padding: 20px;
		vertical-align: middle;

		${() =>
			[...Array(5)]
				.map((_, i) => `&.col-${i + 1} { grid-column: span ${i + 1}; }`)
				.join(" ")}
	}
`;

const TableAction = styled.a`
	background-color: #fbfbfc;
	border: 1px solid #e9ecef;
	color: #489be8;
	border-top: 0;
	display: block;
	font-size: 11pt;
	margin-bottom: 10px;
	padding: 15px;
	text-align: center;
`;

const Status = styled.span`
	display: inline-block;
	line-height: 20px;
	padding-left: 24px;
	position: relative;

	&:before {
		background-color: #d4dadf;
		border-radius: 50%;
		content: "";
		height: 12px;
		left: 0;
		position: absolute;
		top: 4px;
		width: 12px;

		${props =>
			props.success &&
			css`
				background-color: #18c96e;
			`}
	}
`;

const Subheading = styled.h2`
	font-size: 24pt;
	font-weight: 700;
	margin-top: 0;
	margin-bottom: 30px;
`;

export {
	Box,
	Container,
	FilterBody,
	FilterHeader,
	FilterWrap,
	Heading,
	Link,
	Paragraph,
	RouterLink,
	Table,
	TableAction,
	Status,
	Subheading
};
