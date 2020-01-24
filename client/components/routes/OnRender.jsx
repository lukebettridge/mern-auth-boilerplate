import { useEffect } from "react";
import PropTypes from "prop-types";

const OnRender = props => {
	useEffect(() => {
		if (props.method) props.method();
	}, []);
	return null;
};

OnRender.propTypes = {
	method: PropTypes.func
};

export default OnRender;
