import styled, { css } from "styled-components";
import breakpoints from "components/styles/breakpoints";

import { Link as RouterLink } from "react-router-dom";

const anchorStyles = `
	align-items: center;
	color: #294661;
	cursor: pointer;
	display: flex;
	font-size: 12pt;
	font-weight: 300;
	justify-content: space-between;
	opacity: 0.6;
	text-decoration: none;
	transition: opacity 0.3s;

	&:hover {
		opacity: 1;
	}

	span svg {
		font-size: 18pt;
		margin-right: 6px;
		padding-bottom: 3px;
		vertical-align: middle;
	}
`;

const subAnchorStyles = `
	${anchorStyles}
	font-size: 11pt;
	padding-left: 15px;
`;

const Anchor = styled.a`
	${anchorStyles}
	${props =>
		props.active &&
		css`
			opacity: 1;
		`}
`;

const Link = styled(RouterLink)`
	${anchorStyles}
`;

const List = styled.ul`
	margin: 0;
`;

const ListItem = styled.li`
	margin-bottom: 40px;
`;

const SubAnchor = styled.a`
	${subAnchorStyles}
`;

const SubLink = styled(RouterLink)`
	${subAnchorStyles}
`;

const SubList = styled.ul`
	margin-top: 15px;
	max-height: 1000px;
	overflow: hidden;
	transition: all 0.3s;

	${props =>
		!props.active &&
		css`
			margin: 0;
			max-height: 0;
		`}
`;

const SubListItem = styled.li`
	margin-bottom: 8px;
`;

const Navigation = styled.div`
	background-color: #fbfbfc;
	border-right: 1px solid #e9ecef;
	display: none;
	height: 100vh;
	max-width: 200px;
	min-width: 200px;
	padding-left: 15px;
	padding-right: 10px;
	width: 200px;

	&.active {
		display: table-cell;
	}

	@media (min-width: ${breakpoints.m}) {
		display: table-cell;
	}
`;

module.exports = {
	Anchor,
	Link,
	List,
	ListItem,
	Navigation,
	SubAnchor,
	SubLink,
	SubList,
	SubListItem
};
