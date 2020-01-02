import React from "react";
import PropType from "prop-types";
import ReactModal from "react-modal";

import * as S from "./styles";

const Modal = props => {
	ReactModal.setAppElement("#app");
	const customStyles = {
		content: {
			backgroundColor: "#ffffff",
			borderColor: "#eeeeee",
			borderRadius: "3px",
			bottom: "auto",
			left: "50%",
			maxWidth: "650px",
			paddingBottom: "62px",
			right: "auto",
			top: "50%",
			transform: "translate(-50%, -50%)",
			width: "calc(100% - 20px)"
		}
	};
	return (
		<ReactModal
			isOpen={props.isOpen}
			onRequestClose={props.close}
			style={customStyles}
		>
			<S.Header>
				<S.Close onClick={props.close} />
			</S.Header>
			{props.children}
		</ReactModal>
	);
};

Modal.propTypes = {
	children: PropType.any,
	close: PropType.func,
	isOpen: PropType.bool.isRequired
};

export default Modal;
