import React from "react";
import PropType from "prop-types";

import * as S from "./styles";

const Button = props => {
	return <S.Button {...props}>{props.children}</S.Button>;
};

Button.propTypes = {
	children: PropType.any
};

export default Button;
