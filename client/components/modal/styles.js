import styled from "styled-components";

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
	margin-bottom: 30px;
`;

module.exports = { Close, Header };
