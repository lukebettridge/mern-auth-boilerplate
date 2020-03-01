import styled, { css } from "styled-components";

const DatePickerContainer = styled.div`
	${props =>
		props.inError &&
		css`
			& + label {
				color: #db1802;
			}
		`}

	${props =>
		(props.value || props.focused) &&
		css`
			& + label {
				font-size: 95%;
				transform: translate3d(0, -100%, 0);
				opacity: 1;
			}
		`}
`;

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

const Container = styled.div`
	position: relative;

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

	.SingleDatePicker,
	.SingleDatePickerInput,
	.DateInput {
		display: block;
		width: 100%;
	}

	.DateInput_input {
		background-color: transparent;
		border-bottom: 1px solid #e9ecef;
		font-size: 11pt;
		font-weight: 300;
		letter-spacing: 1px;
		margin-bottom: 8px;
		padding: 12px 10px 5px;
		transition: border-color 100ms;
		width: 100%;

		&:hover {
			border-color: #b3b3b3;
		}

		${props =>
			props.inError &&
			css`
				border-color: #db1802;
			`}
	}
`;

const Label = styled.label`
	color: #999999;
	left: 0;
	opacity: 0.5;
	font-weight: 300;
	padding-left: 10px;
	padding-top: 10px;
	position: absolute;
	top: 0;
	transition: all 200ms;
`;

export { Container, DatePickerContainer, Error, Label };
