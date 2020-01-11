import React, { useEffect } from "react";
import PropType from "prop-types";

import * as S from "./styles";

const Modal = props => {
	useEffect(() => {
		S.Modal.setAppElement("#app");
	}, []);

	return (
		<S.Modal
			isOpen={props.isOpen}
			onRequestClose={props.close}
			sideModal={props.sideModal}
		>
			<S.Header>
				<S.Close onClick={props.close} />
				{props.title && <S.Heading>{props.title}</S.Heading>}
			</S.Header>
			{props.children}
		</S.Modal>
	);
};

Modal.propTypes = {
	children: PropType.any,
	close: PropType.func,
	isOpen: PropType.bool.isRequired,
	sideModal: PropType.bool,
	title: PropType.string
};

export default Modal;
