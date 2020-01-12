import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Box } from "components/styles";
import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";

const TodoModal = props => {
	const initialState = {
		text: "",
		errors: {},
		todo: props.todo || {},
		success: false,
		validate: false
	};
	const [state, setState] = useState(initialState);

	useEffect(() => {
		if (props.isOpen) setState(initialState);
		else setState(prev => ({ ...prev, todo: {} }));
	}, [props.isOpen]);

	useEffect(() => {
		if (state.validate) setState(prev => ({ ...prev, validate: false }));
	}, [state.validate]);

	const onChange = e => {
		const { name, value } = e.target;
		setState(prev => ({
			...prev,
			todo: {
				...prev.todo,
				[name]: value
			}
		}));
	};

	const { text } = state.todo;

	return (
		<Modal
			close={props.close}
			isOpen={props.isOpen}
			sideModal={true}
			title={"Todo Information"}
		>
			<form>
				<Input
					error={state.errors.text}
					isRequired={true}
					label="Text"
					mb="m"
					name="text"
					onChange={onChange}
					validate={state.validate}
					value={text}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Modal>
	);
};

TodoModal.propTypes = {
	close: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	todo: PropTypes.any
};

export default TodoModal;
