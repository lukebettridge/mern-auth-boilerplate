import React from "react";
import PropTypes from "prop-types";

import * as S from "./styles";

const Button = props => {
	return <S.Button {...props}>{props.children}</S.Button>;
};

Button.propTypes = {
	children: PropTypes.any
};

Button.defaultProps = {
	type: "button"
};

export default Button;
