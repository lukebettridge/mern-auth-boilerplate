import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import Modal from "components/modal";
import Input from "components/form/input";
import Button from "components/form/button";

const TodoModal = props => {
	const initialState = {
		text: "",
		errors: {},
		new: false,
		todo: props.todo || {
			text: ""
		}
	};
	const [state, setState] = useState(initialState);
	const refs = { text: useRef() };

	useEffect(() => {
		if (props.isOpen) setState({ ...initialState, new: !props.todo });
		else setState(prev => ({ ...prev, todo: {} }));
	}, [props.isOpen]);

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

	const saveTodo = mutation => {
		let isValid = true;
		setState(prev => ({ ...prev, errors: {} }));
		for (const [, ref] of Object.entries(refs))
			if (ref.current.validate().length) isValid = false;

		if (!isValid) return;
		mutation()
			.then(() => {
				props.onSuccess();
				if (state.new) props.close();
			})
			.catch(err => {
				if (err.graphQLErrors.length > 0) {
					const errors = err.graphQLErrors[0];
					setState(prev => ({ ...prev, errors }));
				}
			});
	};

	const removeTodo = mutation => {
		mutation()
			.then(() => {
				props.onSuccess();
				props.close();
			})
			.catch(err => {
				if (err.graphQLErrors.length > 0) {
					const errors = err.graphQLErrors[0];
					setState(prev => ({ ...prev, errors }));
				}
			});
	};

	const { id, text } = state.todo;

	return (
		<Modal
			close={props.close}
			isOpen={props.isOpen}
			sideModal={true}
			title={state.new ? "New Todo" : "Todo Information"}
		>
			<form noValidate onSubmit={e => e.preventDefault()}>
				<Input
					error={state.errors.text}
					isRequired={true}
					label="Text"
					mb="m"
					name="text"
					onChange={onChange}
					ref={refs.text}
					value={text}
				/>
				<Mutation
					mutation={
						state.new
							? gql`
									mutation addTodo($text: String!) {
										addTodo(text: $text)
									}
							  `
							: gql`
									mutation updateTodo($id: ID!, $text: String!) {
										updateTodo(id: $id, text: $text)
									}
							  `
					}
					variables={{ id, text }}
				>
					{(mutation, { loading }) => (
						<Button
							disabled={loading}
							onClick={!loading ? () => saveTodo(mutation) : null}
						>
							Save
						</Button>
					)}
				</Mutation>
				{!state.new && (
					<Mutation
						mutation={gql`
							mutation removeTodo($id: ID!) {
								removeTodo(id: $id)
							}
						`}
						variables={{ id, text }}
					>
						{(mutation, { loading }) => (
							<Button
								disabled={loading}
								onClick={!loading ? () => removeTodo(mutation) : null}
								secondary
							>
								Remove
							</Button>
						)}
					</Mutation>
				)}
			</form>
		</Modal>
	);
};

TodoModal.propTypes = {
	close: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onSuccess: PropTypes.func.isRequired,
	todo: PropTypes.any
};

export default TodoModal;
