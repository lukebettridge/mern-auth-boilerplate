import styled, { css } from "styled-components";
import breakpoints from "components/styles/breakpoints";

import ReactModal from "react-modal";

const Body = styled.div`
	@media (min-width: ${breakpoints.m}) {
		padding: 10px 20px;
	}

	${props =>
		!props.sideModal &&
		css`
			text-align: center;
		`}
`;

const Close = styled.a`
	height: 32px;
	opacity: 0.3;
	position: relative;
	width: 32px;

	&:hover {
		cursor: pointer;
		opacity: 1;
	}

	&:before,
	&:after {
		background-color: #333;
		content: " ";
		height: 33px;
		left: 15px;
		position: absolute;
		width: 2px;
	}

	&:before {
		transform: rotate(45deg);
	}

	&:after {
		transform: rotate(-45deg);
	}
`;

const Header = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	margin-bottom: 30px;

	@media (min-width: ${breakpoints.m}) {
		padding-left: 20px;
	}
`;

const Heading = styled.h2`
	font-weight: 700;
	margin: 0;
`;

const Modal = styled(ReactModal)`
	background-color: #ffffff;
	border: 1px solid #e9ecef;
	bottom: auto;
	left: 50%;
	max-width: 650px;
	outline: none;
	padding: 20px 20px 62px;
	position: absolute;
	right: auto;
	top: 43%;
	width: calc(100% - 20px);

	${props =>
		props.sideModal
			? css`
					border: 0;
					border-left: 1px solid #e9ecef;
					bottom: 0;
					left: auto;
					max-width: 720px;
					overflow-y: auto;
					padding: 40px 20px;
					right: -100%;
					top: 0;
					transition: right 0.5s;
					width: 100%;
					z-index: 2;

					&.ReactModal__Content--after-open {
						right: 0;
					}

					@media (min-width: ${breakpoints.m}) {
						padding: 60px;
					}
			  `
			: css`
					border-radius: 2px;
					padding-bottom: 62px;
					transform: translate(-50%, -50%);
			  `}
`;

module.exports = { Body, Close, Header, Heading, Modal };
