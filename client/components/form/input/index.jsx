import React, { useEffect, useState } from "react";
import PropType from "prop-types";

import * as S from "./styles";

const Input = props => {
	const [state, setState] = useState({
		error: props.error || ""
	});

	useEffect(() => {
		const { error } = props;
		setState({ ...state, error });
	}, [props.error]);

	useEffect(() => {
		if (props.validate) validate();
	}, [props.validate]);

	const validate = () => {
		let error = "";
		const { friendlyName, isRequired, max, min, name, pattern, value } = props;
		const prefix = friendlyName || name || "This";

		if (isRequired && value.replace(/^\s+|\s+$/g, "").length === 0) {
			error = `${prefix} field is required`;
		} else if (pattern && !RegExp(pattern).test(value)) {
			error = `${prefix} field is invalid`;
		} else if (
			typeof max === "number" &&
			typeof min === "number" &&
			(value < min || value > max)
		) {
			error = `${prefix} must be between ${min} and ${max}.`;
		} else if (typeof max === "number" && value > max) {
			error = `${prefix} must be smaller than ${max}.`;
		} else if (typeof min === "number" && value < min) {
			error = `${prefix} must be larger than ${min}.`;
		}

		if (!props.error) setState({ ...state, error });
	};

	return (
		<S.InputContainer {...props}>
			<S.Input
				inError={!!state.error}
				onBlur={props.onBlur || validate}
				{...props}
				ref={props.forwardRef}
			/>
			{!!state.error && <S.Error>{state.error}</S.Error>}
		</S.InputContainer>
	);
};

Input.propTypes = {
	error: PropType.string,
	forwardRef: PropType.any,
	friendlyName: PropType.string,
	isRequired: PropType.bool,
	max: PropType.number,
	min: PropType.number,
	name: PropType.string,
	onBlur: PropType.func,
	onChange: PropType.func,
	pattern: PropType.any,
	placeholder: PropType.string,
	type: PropType.string,
	validate: PropType.bool,
	value: PropType.any
};

Input.defaultProps = {
	placeholder: "",
	type: "text"
};

export default Input;
