import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState
} from "react";
import PropTypes from "prop-types";
import { SingleDatePicker } from "react-dates";
import moment from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import * as utils from "./utils";
import * as S from "./styles";

const DatePicker = forwardRef((props, ref) => {
	const [state, setState] = useState({
		error: props.error || "",
		focused: false
	});

	useEffect(() => {
		const { error } = props;
		setState(prev => ({ ...prev, error }));
	}, [props.error]);

	useImperativeHandle(ref, () => ({ validate }));

	const onFocus = ({ focused }) => {
		if (!focused) validate(true);
		setState(prev => ({ ...prev, focused }));
	};

	const onChange = date => {
		date = date?.valueOf().toString();
		if (props.onChange)
			props.onChange({ target: { name: props.name, value: date } });
		setTimeout(() => {
			setState(prev => ({ ...prev, error: "" }));
		}, 1);
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
		<S.Container {...props} inError={!!state.error}>
			<S.DatePickerContainer
				focused={state.focused}
				inError={!!state.error}
				value={props.value}
			>
				<SingleDatePicker
					date={props.value ? moment(props.value, "x") : null}
					focused={state.focused}
					id={id}
					noBorder
					onDateChange={onChange}
					onFocusChange={onFocus}
					placeholder=""
					ref={ref}
				/>
			</S.DatePickerContainer>
			{props.label && <S.Label htmlFor={id}>{props.label}</S.Label>}
			{!!state.error && (
				<S.Error data-cy="error" htmlFor={id}>
					{state.error}
				</S.Error>
			)}
		</S.Container>
	);
});

DatePicker.propTypes = {
	error: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.any
};

export default DatePicker;
