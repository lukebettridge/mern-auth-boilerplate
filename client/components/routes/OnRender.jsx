import { useEffect } from "react";
import PropTypes from "prop-types";

const OnRender = props => {
	useEffect(() => {
		props.method();
	}, []);
	return null;
};

OnRender.propTypes = {
	method: PropTypes.func.isRequired
};

export default OnRender;
