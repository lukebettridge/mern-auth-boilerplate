import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import * as S from "./styles";

const Select = props => {
	const [state, setState] = useState({
		error: props.error || ""
	});

	useEffect(() => {
		const { error } = props;
		setState(prev => ({ ...prev, error }));
	}, [props.error]);

	useEffect(() => {
		if (props.validate) validate();
	}, [props.validate]);

	const orderOptions = values => {
		return values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed));
	};

	const onBlur = e => {
		validate(true);
		if (props.onBlur) props.onBlur(e);
	};

	const onChange = (value, { action, removedValue }) => {
		setState(prev => ({ ...prev, error: "" }));
		switch (action) {
			case "remove-value":
			case "pop-value":
				if (removedValue.isFixed) {
					return;
				}
				break;
			case "clear":
				value = props.options.filter(v => v.isFixed);
				break;
		}
		if (props.onChange)
			props.onChange({
				target: {
					name: props.name,
					value: orderOptions(value)
				}
			});
	};

	const validate = () => {};

	const styles = {
		multiValue: (base, state) => {
			return state.data.isFixed
				? { ...base, backgroundColor: "#bbbbbb" }
				: base;
		},
		multiValueLabel: (base, state) => {
			return state.data.isFixed
				? { ...base, color: "white", paddingRight: 6 }
				: base;
		},
		multiValueRemove: (base, state) => {
			return state.data.isFixed ? { ...base, display: "none" } : base;
		}
	};

	const id = props.id || props.name;

	return (
		<S.SelectContainer className="selectContainer" {...props}>
			<S.Select
				{...props}
				classNamePrefix="react-select"
				id={id}
				inError={!!state.error}
				onBlur={onBlur}
				onChange={onChange}
				options={orderOptions(props.options)}
				ref={props.forwardRef}
				styles={styles}
			/>
			{props.label && <S.Label htmlFor={id}>{props.label}</S.Label>}
			{!!state.error && <S.Error>{state.error}</S.Error>}
		</S.SelectContainer>
	);
};

Select.propTypes = {
	error: PropTypes.string,
	forwardRef: PropTypes.any,
	friendlyName: PropTypes.string,
	id: PropTypes.string,
	isMulti: PropTypes.bool,
	isRequired: PropTypes.bool,
	label: PropTypes.string,
	name: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	options: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	validate: PropTypes.bool,
	value: PropTypes.any
};

Select.defaultProps = {
	options: [],
	placeholder: ""
};

export default Select;
