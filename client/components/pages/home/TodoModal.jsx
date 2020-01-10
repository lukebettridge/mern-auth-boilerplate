import React, { useEffect, useState } from "react";
import PropType from "prop-types";

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
		else setState({ ...state, todo: {} });
	}, [props.isOpen]);

	useEffect(() => {
		if (state.validate) setState({ ...state, validate: false });
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
			<Box border="none" mb="none" padding="none">
				<form>
					<Input
						error={state.errors.text}
						isRequired={true}
						mb="m"
						name="text"
						onChange={onChange}
						placeholder="Text"
						validate={state.validate}
						value={text}
					/>
					<Button maxWidth="350px" type="submit">
						Submit
					</Button>
				</form>
			</Box>
		</Modal>
	);
};

TodoModal.propTypes = {
	close: PropType.func.isRequired,
	isOpen: PropType.bool.isRequired,
	todo: PropType.any
};

export default TodoModal;
