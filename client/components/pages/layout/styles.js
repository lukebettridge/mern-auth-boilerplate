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

const Container = styled.div`
	display: flex;
	height: 100%;
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

const Slider = styled.div`
	align-items: center;
	background-color: #fbfbfc;
	border-left: 1px solid #e9ecef;
	border-bottom: 1px solid #e9ecef;
	color: #294661;
	display: flex;
	height: 50px;
	justify-content: center;
	position: absolute;
	right: 0;
	top: 0;
	width: 50px;
	z-index: 1;
	@media (min-width: ${breakpoints.m}) {
		display: none;
	}
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
	height: 100%;
	max-width: 200px;
	min-width: 200px;
	padding-left: 15px;
	padding-right: 10px;
	padding-top: 48px;
	width: 200px;
	z-index: 1;

	${props =>
		props.active &&
		css`
			display: table-cell;
			position: absolute;
		`}

	@media (min-width: ${breakpoints.m}) {
		display: table-cell;
		height: unset;
		position: unset;
	}
`;

module.exports = {
	Anchor,
	Container,
	Link,
	List,
	ListItem,
	Navigation,
	Slider,
	SubAnchor,
	SubLink,
	SubList,
	SubListItem
};
