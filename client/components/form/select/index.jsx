import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState
} from "react";
import PropTypes from "prop-types";

import * as S from "./styles";

const Select = forwardRef((props, ref) => {
	const [state, setState] = useState({
		error: props.error || ""
	});

	useEffect(() => {
		const { error } = props;
		setState(prev => ({ ...prev, error }));
	}, [props.error]);

	useImperativeHandle(ref, () => ({ validate }));

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
				value = props.options?.filter(v => v.isFixed);
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

	const validate = (onBlur = false) => {
		let error = "";
		const { friendlyName, isRequired, name, value } = props;
		const prefix = friendlyName || name || "This";

		if (
			isRequired &&
			(!value ||
				(props.isMulti && value.length === 0) ||
				(!props.isMulti && value.replace(/^\s+|\s+$/g, "").length === 0))
		) {
			error = `${prefix} field is required`;
		}

		setState(prev => ({
			...prev,
			error: !onBlur ? props.error || error : error
		}));
		return error;
	};

	const orderOptions = values => {
		return values
			?.filter(v => v.isFixed)
			.concat(values?.filter(v => !v.isFixed));
	};

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
				ref={ref}
				styles={styles}
			/>
			{props.label && <S.Label htmlFor={id}>{props.label}</S.Label>}
			{!!state.error && <S.Error>{state.error}</S.Error>}
		</S.SelectContainer>
	);
});

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
