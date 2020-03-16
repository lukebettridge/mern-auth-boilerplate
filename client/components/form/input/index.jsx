import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState
} from "react";
import PropTypes from "prop-types";

import * as utils from "./utils";
import * as S from "./styles";

const Input = forwardRef((props, ref) => {
	const [state, setState] = useState({
		error: props.error || "",
		focused: false,
		value: props.value || ""
	});

	useEffect(() => {
		const { error } = props;
		setState(prev => ({ ...prev, error }));
	}, [props.error]);

	useImperativeHandle(ref, () => ({ validate }));

	const onBlur = e => {
		setState(prev => ({ ...prev, focused: false }));
		validate(true);
		if (props.onBlur) props.onBlur(e);
	};

	const onChange = e => {
		const { value } = e.target;
		setState(prev => ({ ...prev, error: "", value }));
		if (props.onChange) props.onChange(e);
	};

	const onFocus = e => {
		setState(prev => ({ ...prev, focused: true }));
		if (props.onFocus) props.onFocus(e);
	};

	const validate = (onBlur = false) => {
		const error = utils.validate(props);
		setState(prev => ({
			...prev,
			error: !onBlur ? props.error || error : error
		}));
		return error;
	};

	const id = props.id || props.name;

	return (
		<S.InputContainer className="inputContainer" {...props}>
			<S.Input
				{...props}
				id={id}
				inError={!!state.error}
				onBlur={onBlur}
				onChange={onChange}
				onFocus={onFocus}
				placeholder={
					props.label
						? state.focused
							? props.placeholder
							: ""
						: props.placeholder
				}
				ref={ref}
				value={props.value}
			/>
			{props.label && <S.Label htmlFor={id}>{props.label}</S.Label>}
			{!!state.error && (
				<S.Error data-cy="error" htmlFor={id}>
					{state.error}
				</S.Error>
			)}
		</S.InputContainer>
	);
});

Input.propTypes = {
	error: PropTypes.string,
	friendlyName: PropTypes.string,
	id: PropTypes.string,
	isRequired: PropTypes.bool,
	label: PropTypes.string,
	max: PropTypes.number,
	min: PropTypes.number,
	name: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	pattern: PropTypes.any,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.any
};

Input.defaultProps = {
	placeholder: "",
	type: "text"
};

export default Input;
