import styled, { css } from "styled-components";
import breakpoints from "components/styles/breakpoints";
import { default as ReactSelect } from "react-select";

const Error = styled.p`
	color: #db1802;
	font-size: 10pt;
	font-weight: 300;
	margin-bottom: 16px;
	margin-top: 0;
	&:first-letter {
		text-transform: capitalize;
	}
`;

const Select = styled(ReactSelect)`
	&:focus + label {
		font-size: 75%;
		transform: translate3d(0, -100%, 0);
		opacity: 1;
	}

	${props =>
		props.value &&
		props.value.length > 0 &&
		css`
			& + label {
				font-size: 75%;
				transform: translate3d(0, -100%, 0);
				opacity: 1;
			}
		`}

	${props =>
		props.inError &&
		css`
			& + label {
				color: #db1802;
			}
		`}
        
	.react-select__control {
		appearance: none;
		background-color: transparent;
		border: 0;
		border-bottom: 1px solid #e9ecef;
		border-radius: 0;
		box-shadow: none;
		font-size: 12pt;
		font-weight: 300;
		height: 42px;
		margin-bottom: 8px;
		outline: none;
		width: 100%;

		${props =>
			props.inError &&
			css`
				border-color: #db1802;
			`}

		.react-select__input {
			opacity: 0;
		}
	}
`;

const SelectContainer = styled.div`
	position: relative;
	width: 100%;

	@media (min-width: ${breakpoints.m}) {
		min-width: 250px;
	}

	${props =>
		props.label &&
		css`
			margin-top: 30px;
		`}

	${props =>
		props.mb &&
		css`
			margin-bottom: 30px;
		`}
`;

const Label = styled.label`
	left: 0;
	opacity: 0.5;
	font-weight: 300;
	padding-left: 10px;
	padding-top: 10px;
	position: absolute;
	top: 0;
	transition: all 200ms;
`;

export { Error, Select, SelectContainer, Label };
