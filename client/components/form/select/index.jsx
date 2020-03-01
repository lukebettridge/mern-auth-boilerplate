import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState
} from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";

import * as utils from "./utils";
import * as S from "./styles";

const Select = forwardRef((props, ref) => {
	const [state, setState] = useState({
		error: props.error || "",
		focused: false,
		isLoading: false
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

	const onChange = (value, options = null) => {
		setState(prev => ({ ...prev, error: "" }));

		if (options) {
			const { action, removedValue } = options;
			switch (action) {
				case "pop-value":
					if (removedValue.isFixed) {
						return;
					}
					break;
				case "clear":
					value = props.options?.filter(v => v.isFixed);
					break;
			}
		}
		if (props.onChange)
			props.onChange({
				target: {
					name: props.name,
					value: orderOptions(value)
				}
			});
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

	const orderOptions = values => {
		if (!Array.isArray(values)) return values;
		return values
			?.filter(v => v.isFixed)
			.concat(values?.filter(v => !v.isFixed));
	};

	const handleCreate = value => {
		if (!props.mutation) return;
		setState(prev => ({ ...prev, isLoading: true }));
		props.client.mutate(props.mutation(value)).then(result => {
			onChange(result.data[Object.keys(result.data)[0]]);
			setState(prev => ({ ...prev, isLoading: false }));
		});
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
	const selectProps = {
		...props,
		classNamePrefix: "react-select",
		id,
		inError: !!state.error,
		onBlur,
		onChange,
		onFocus,
		options: orderOptions(props.options),
		ref,
		styles
	};

	return (
		<S.Container {...selectProps}>
			<S.SelectContainer {...selectProps}>
				{props.isCreatable ? (
					<S.CreatableSelect
						isClearable
						isLoading={state.isLoading}
						onCreateOption={handleCreate}
						{...selectProps}
					/>
				) : (
					<S.Select {...selectProps} />
				)}
			</S.SelectContainer>
			{props.label && <S.Label htmlFor={id}>{props.label}</S.Label>}
			{!!state.error && <S.Error>{state.error}</S.Error>}
		</S.Container>
	);
});

Select.propTypes = {
	client: PropTypes.object,
	error: PropTypes.string,
	friendlyName: PropTypes.string,
	id: PropTypes.string,
	isClearable: PropTypes.bool,
	isCreatable: PropTypes.bool,
	isMulti: PropTypes.bool,
	isRequired: PropTypes.bool,
	isSearchable: PropTypes.bool,
	label: PropTypes.string,
	mutation: PropTypes.func,
	name: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	options: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.any
};

Select.defaultProps = {
	isCreatable: false,
	options: [],
	placeholder: ""
};

export { Select };

export default withApollo(Select, { withRef: true });
